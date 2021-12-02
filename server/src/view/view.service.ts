import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import next from '../../../client/node_modules/next';
import { NextServer } from '../../../client/node_modules/next/dist/server/next';

@Injectable()
export class ViewService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  private server: NextServer;

  async onModuleInit(): Promise<void> {
    try {
      this.server = next({
        dev: this.configService.get<boolean>('dev'),
        dir: '../client',
      });
      await this.server.prepare();
    } catch (error) {
      console.log(error);
    }
  }

  getNextServer(): NextServer {
    return this.server;
  }
}
