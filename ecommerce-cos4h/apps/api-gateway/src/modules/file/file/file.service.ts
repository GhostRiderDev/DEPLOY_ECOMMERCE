import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileService implements OnModuleInit {
  constructor(@Inject('MS-FILES') private readonly clientFiles: ClientKafka) {}
  async create(file: Express.Multer.File) {
    const response = await firstValueFrom(
      this.clientFiles.send('MS-FILE-PRODUCT-POST', file),
    );
    return response;
  }

  async onModuleInit() {
    this.clientFiles.subscribeToResponseOf('MS-FILE-PRODUCT-POST');
    await this.clientFiles.connect();
  }

  update() {}
}
