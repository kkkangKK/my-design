"use client";

import { useSocketStore } from "@/stores/socket";
import { useUserStore } from "@/stores/user";
import { useEffect, useRef, useState } from "react";

type PeerConnection = RTCPeerConnection & { userId?: string };
type Participants = { userId: string; userName: string }[];

export default function VoiceChatRoom() {
  const [isOpenCall, setIsOpenCall] = useState(false);
  const { socket } = useSocketStore();
  const { userId: user_id, userName } = useUserStore();
  const [isMuted, setIsMuted] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<Participants>([]);
  const [error, setError] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const peerConnections = useRef<Record<string, PeerConnection>>({});
  const localStream = useRef<MediaStream | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  useEffect(() => {
    if (!isOpenCall) return;
    if (!socket) {
      console.log("socket is null");
      return;
    }

    const setupPeerConnection = (userId: string) => {
      const pc = new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun1.l.google.com:19302" },
        ],
        iceTransportPolicy: "all",
      }) as PeerConnection;
      pc.userId = userId;
      console.log("创建新的PeerConnection for user:", userId);

      // 添加本地流（如果存在）
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStream.current!);
        });
      }

      pc.onicecandidate = (event) => {
        console.log("ICE候选事件:", event);
        if (event.candidate) {
          console.log("发送ICE候选给:", userId);
          socket?.emit("voiceIceCandidate", {
            candidate: event.candidate,
            targetUserId: userId,
            userId: user_id,
          });
        } else {
          console.log("ICE收集完成");
        }
      };

      pc.oniceconnectionstatechange = () => {
        console.log(`ICE连接状态变化: ${pc.iceConnectionState}`);
      };

      pc.ontrack = (event) => {
        console.log("接收到远程流 from:", userId);
        const audio = audioRefs.current[userId];
        if (audio && event.streams[0]) {
          audio.srcObject = event.streams[0];
        }
      };

      return pc;
    };

    const handleUserJoined = async ({
      userId,
      participants,
    }: {
      userId: string;
      participants: Participants;
    }) => {
      if (userId === user_id || peerConnections.current[userId]) return;

      const pc = setupPeerConnection(userId);
      peerConnections.current[userId] = pc;

      setParticipants(participants.filter((item) => item.userId !== user_id));

      // 创建offer并发送给新加入的用户
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        if (socket) {
          socket.emit("voiceOffer", {
            offer: offer,
            targetUserId: userId,
            userId: user_id,
          });
        }
      } catch (err) {
        console.error("Error creating offer:", err);
      }
    };

    const handleOffer = async ({
      offer,
      userId,
    }: {
      offer: RTCSessionDescriptionInit;
      userId: string;
    }) => {
      const pc = setupPeerConnection(userId);
      peerConnections.current[userId] = pc;

      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("voiceAnswer", {
        answer,
        targetUserId: userId,
        userId: user_id,
      });
    };

    const handleAnswer = async ({
      answer,
      userId,
    }: {
      answer: RTCSessionDescriptionInit;
      userId: string;
    }) => {
      const pc = peerConnections.current[userId];
      if (pc) {
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      }
    };

    const handleIceCandidate = async ({
      candidate,
      userId,
    }: {
      candidate: RTCIceCandidateInit;
      userId: string;
    }) => {
      const pc = peerConnections.current[userId];
      if (pc && candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(candidate));
        } catch (err) {
          console.error("Error adding ICE candidate", err);
        }
      }
    };

    const handleUserLeft = (userId: string) => {
      const pc = peerConnections.current[userId];
      if (pc) {
        pc.close();
        delete peerConnections.current[userId];
        setParticipants((prev) => prev.filter((item) => item.userId !== userId));
      }
    };

    socket.on("voiceUserJoined", handleUserJoined);
    socket.on("voiceOffer", handleOffer);
    socket.on("voiceAnswer", handleAnswer);
    socket.on("voiceIceCandidate", handleIceCandidate);
    socket.on("voiceUserLeft", handleUserLeft);
    socket.on("voiceError", (err: string) => {
      setError(err);
      setIsConnected(false);
    });
    socket.on(
      "voiceJoinedSuccess",
      ({ participants, roomId }: { participants: Participants; roomId: string }) => {
        setRoomId(roomId);
        setParticipants(participants.filter((item) => item.userId !== user_id));
      },
    );

    return () => {
      socket.off("voiceUserJoined", handleUserJoined);
      socket.off("voiceOffer", handleOffer);
      socket.off("voiceAnswer", handleAnswer);
      socket.off("voiceIceCandidate", handleIceCandidate);
      socket.off("voiceUserLeft", handleUserLeft);
    };
  }, [socket, isOpenCall]);

  const startCall = async () => {
    try {
      setIsOpenCall(true);
      if (!navigator.mediaDevices) {
        throw new Error("您的浏览器不支持媒体设备访问");
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStream.current = stream;
      setIsConnected(true);

      // 添加本地流到所有现有的peer connections
      Object.values(peerConnections.current).forEach((pc) => {
        stream.getTracks().forEach((track) => {
          pc.addTrack(track, stream);
        });
      });

      if (socket) {
        socket.emit("voiceJoinRoom", { userId: user_id });
      }
    } catch (err) {
      console.error("Error accessing microphone", err);
      setError(err instanceof Error ? err.message : "无法访问麦克风，请检查浏览器权限设置");
      setIsConnected(false);
    }
  };

  const stopCall = () => {
    setIsOpenCall(false);
    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
      localStream.current = null;
    }

    Object.values(peerConnections.current).forEach((pc) => pc.close());
    peerConnections.current = {};
    setParticipants([]);
    setIsConnected(false);

    if (socket) {
      socket.emit("voiceLeaveRoom", { userId: user_id });
    }
  };

  const toggleMute = () => {
    if (localStream.current) {
      localStream.current.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted((prev) => !prev);
    }
  };

  return (
    <div className="w-[325px] h-[450px] bg-white bg-opacity-45 border border-gray-200 rounded-lg flex flex-col">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="font-semibold">语音通话</h3>
        {isConnected && (
          <div className="text-sm text-gray-500">通话人数: {participants.length + 1}</div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {participants.length > 0 ? (
          participants.map((item) => (
            <div
              key={item.userId}
              className="flex items-center justify-between space-x-2 p-2 bg-red-50 hover:bg-red-100 rounded"
            >
              <div className="font-medium">{item.userName}</div>
              <div className="text-xs text-green-500">● 在线</div>
              <audio
                ref={(el) => {
                  audioRefs.current[item.userId] = el;
                }}
                autoPlay
                playsInline
                className="hidden"
              />
            </div>
          ))
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
            {error ? (
              <>
                <span className="text-red-500 mb-2">{error}</span>
                <button
                  onClick={startCall}
                  className="mt-2 text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  重试
                </button>
              </>
            ) : isConnected ? (
              roomId ? (
                `房间ID: ${roomId}`
              ) : (
                "等待其他人加入..."
              )
            ) : (
              "请先开始通话"
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 flex justify-center space-x-4">
        {!isConnected ? (
          <button
            onClick={startCall}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            开始通话
          </button>
        ) : (
          <>
            <button
              onClick={toggleMute}
              className={`px-4 py-2 rounded ${isMuted ? "bg-red-500" : "bg-blue-500"} text-white`}
            >
              {isMuted ? "取消静音" : "静音"}
            </button>
            <button
              onClick={stopCall}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              结束通话
            </button>
          </>
        )}
      </div>
    </div>
  );
}
