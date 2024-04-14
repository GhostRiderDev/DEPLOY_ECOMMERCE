import { Injectable } from "@nestjs/common";
import { UploadApiResponse, v2 } from "cloudinary";
import { randomUUID } from "crypto";

@Injectable()
export class FileAppService {
  async uploadImage(
    file: Express.Multer.File & { buffer: { data: number[] } },
    folder: string,
  ): Promise<UploadApiResponse> {
    const bufer = Buffer.from(file.buffer.data);
    file.filename = randomUUID().toString();
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: "image", folder },
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

  async deleteFile(url: string) {
    return await v2.api.delete_resources([url]);
  }
}
