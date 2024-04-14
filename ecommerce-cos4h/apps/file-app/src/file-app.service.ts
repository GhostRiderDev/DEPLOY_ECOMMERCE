import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class FileAppService {
  async uploadImage(
    file: Express.Multer.File & { buffer: { data: number[] } },
    folder: string,
  ): Promise<UploadApiResponse> {
    const bufer = Buffer.from(file.buffer.data);
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'image', folder },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      upload.write(bufer);
      upload.end();
    });
  }
}
