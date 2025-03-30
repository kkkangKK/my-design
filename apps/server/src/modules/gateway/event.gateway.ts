import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { CacheService } from '../cache/cache.service';
import { Cron } from '@nestjs/schedule';

interface RoomState {
  elements: Record<string, any>;
  version: number;
  collaborators: string[];
  lastActive: number;
}

const ROOM_TTL = 12 * 60 * 60; // 12小时（秒）
const ROOM_PREFIX = 'room_';

@WebSocketGateway({ cors: { origin: '*' } })
export class EventGateway {
  constructor(
    private readonly cacheService: CacheService,
    private readonly userService: UserService,
  ) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('newMessage')
  handleMessage(@MessageBody() body: any, @ConnectedSocket() client: Socket) {
    this.server.emit('onMessage', {
      msg: 'new Message',
      content: body,
    });
  }

  // 接收客户端消息的处理器
  @SubscribeMessage('messageToClient')
  handleMessageToClient(@MessageBody() data: string): void {
    console.log('Received message from client:', data);
    // 在这里处理接收到的消息，比如转发给其他客户端
  }

  // 发送消息给所有客户端的方法
  sendMessageToAll(message: string): void {
    this.server.emit('messageToAll', message);
  }

  // 发送消息给特定客户端（假设你有某种方式来确定socketId）
  sendMessageToClient(socketId: string, message: string): void {
    this.server.to(socketId).emit('messageToClient', message);
  }

  private getRoomKey(roomId: string): string {
    return `${ROOM_PREFIX}${roomId}`;
  }

  // 类型保护函数
  private isValidRoomState(obj: any): obj is RoomState {
    return (
      obj &&
      typeof obj.version === 'number' &&
      Array.isArray(obj.collaborators) &&
      typeof obj.elements === 'object' &&
      typeof obj.lastActive === 'number'
    );
  }

  // 获取房间状态
  private async getRoomState(roomId: string): Promise<RoomState | null> {
    const data = await this.cacheService.getCache(this.getRoomKey(roomId));
    try {
      const parsed = JSON.parse(data);
      return this.isValidRoomState(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  // 保存房间状态
  private async saveRoomState(roomId: string, state: RoomState): Promise<void> {
    await this.cacheService.setCache(
      this.getRoomKey(roomId),
      JSON.stringify(state),
      ROOM_TTL,
    );
  }

  // 每天凌晨3点执行清理
  @Cron('0 0 3 * * *')
  async cleanExpiredRooms() {
    const keys = await this.cacheService.client.keys(`${ROOM_PREFIX}*`);

    for (const key of keys) {
      const data = await this.cacheService.getCache(key);
      try {
        const room = JSON.parse(data);
        if (
          room?.lastActive &&
          Date.now() - room.lastActive > 12 * 60 * 60 * 1000
        ) {
          await this.cacheService.delCache(key);
          console.log(`清理过期房间: ${key.replace(ROOM_PREFIX, '')}`);
        }
      } catch (e) {
        await this.cacheService.delCache(key);
      }
    }
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(
    @MessageBody() { roomId, userId }: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(roomId);

    let room = await this.getRoomState(roomId);
    if (!room) {
      room = {
        elements: {},
        version: 0,
        collaborators: [],
        lastActive: Date.now(),
      };
    }

    if (!room.collaborators.includes(userId)) {
      room.collaborators.push(userId);
    }

    room.lastActive = Date.now();
    await this.saveRoomState(roomId, room);

    client.emit('roomSnapshot', {
      elements: room.elements,
      version: room.version,
      collaborators: room.collaborators,
    });

    const user = await this.userService.findUserByUserId(userId);
    client.to(roomId).emit('collaboratorJoined', user.username);
  }

  @SubscribeMessage('deltaUpdate')
  async handleDeltaUpdate(
    @MessageBody()
    {
      roomId,
      delta,
      clientVersion,
    }: { roomId: string; delta: any; clientVersion: number },
    @ConnectedSocket() client: Socket,
  ) {
    const room = await this.getRoomState(roomId);
    if (!room) return;

    if (clientVersion < room.version) {
      client.emit('conflictDetected', {
        serverVersion: room.version,
        serverState: room.elements,
      });
      return;
    }

    Object.assign(room.elements, delta.changes);
    room.version++;
    room.lastActive = Date.now();
    await this.saveRoomState(roomId, room);

    client.to(roomId).emit('remoteUpdate', {
      delta: delta.changes,
      version: room.version,
    });
  }

  @SubscribeMessage('leaveRoom')
  async handleLeaveRoom(
    @MessageBody() { roomId, userId }: { roomId: string; userId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(roomId);
    const room = await this.getRoomState(roomId);
    if (room) {
      room.collaborators = room.collaborators.filter((id) => id !== userId);
      room.lastActive = Date.now();
      await this.saveRoomState(roomId, room);

      const user = await this.userService.findUserByUserId(userId);
      client.to(roomId).emit('collaboratorLeft', user.username);
    }
  }
}
