import { InjectRedis } from '@nestjs-modules/ioredis';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  public client: Redis;

  constructor(@InjectRedis() redisClient: Redis) {
    this.client = redisClient;
  }

  async setCache(key: string, value: any, second: number = 30) {
    return await this.client.set(key, value, 'EX', second);
  }

  async getCache(key: string) {
    if (!key.length)
      throw new HttpException('key不能为空', HttpStatus.BAD_REQUEST);
    return await this.client.get(key);
  }

  async delCache(key: string) {
    if (!key.length)
      throw new HttpException('key不能为空', HttpStatus.BAD_REQUEST);
    return await this.client.del(key);
  }
}
