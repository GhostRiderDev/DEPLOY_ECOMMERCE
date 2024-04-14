import { Injectable } from '@nestjs/common';

@Injectable()
export class FileAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
