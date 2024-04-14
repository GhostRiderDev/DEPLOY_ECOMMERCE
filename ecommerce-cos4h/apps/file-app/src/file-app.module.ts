import { Module } from '@nestjs/common';
import { FileAppController } from './file-app.controller';
import { FileAppService } from './file-app.service';
import { cloudinaryConfig } from './config/cloudinary.config';

@Module({
  imports: [],
  controllers: [FileAppController],
  providers: [FileAppService, cloudinaryConfig],
})
export class FileAppModule {}
