import { Controller } from "@nestjs/common";
import { FileAppService } from "./file-app.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class FileAppController {
  constructor(private readonly fileAppService: FileAppService) {}

  @MessagePattern("MS-FILE-PRODUCT-POST")
  async uploadImageProduct(
    file: Express.Multer.File & { buffer: { data: number[] } },
  ) {
    const image = await this.fileAppService.uploadImage(file, "products");
    return image.secure_url;
  }
}
