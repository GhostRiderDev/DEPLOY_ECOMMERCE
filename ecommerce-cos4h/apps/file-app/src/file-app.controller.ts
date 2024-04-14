import { Controller, Get } from '@nestjs/common';
import { FileAppService } from './file-app.service';

@Controller()
export class FileAppController {
  constructor(private readonly fileAppService: FileAppService) {}

  @Get()
  getHello(): string {
    return this.fileAppService.getHello();
  }
}
