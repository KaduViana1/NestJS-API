import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config/';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  constructor(config: ConfigService) {
    super({ datasources: { db: { url: config.get('SQLITE') } } });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
