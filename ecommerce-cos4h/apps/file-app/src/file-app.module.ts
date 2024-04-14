import { Module } from '@nestjs/common';
import { FileAppController } from './file-app.controller';
import { FileAppService } from './file-app.service';

@Module({
  imports: [],
  controllers: [FileAppController],
  providers: [FileAppService],
})
export class FileAppModule {}
