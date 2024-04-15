import {
  Controller,
  Post,
  Patch,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UUID } from "crypto";

@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post("product/:id")
  @UseInterceptors(FileInterceptor("image"))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: "Image size must be lower than 200kb",
          }),
          new FileTypeValidator({
            fileType: /(png|jpg|jpeg|webp)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Param("id", new ParseUUIDPipe()) id: UUID,
  ) {
    return this.fileService.create(id, file);
  }

  @Patch(":id")
  update() {
    return this.fileService.update();
  }
}
