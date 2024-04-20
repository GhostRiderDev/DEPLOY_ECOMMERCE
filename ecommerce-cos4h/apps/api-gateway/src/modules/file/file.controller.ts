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
  UseGuards,
} from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { UUID } from "crypto";
import { AuthGuard } from "../../guards/Auth.guard";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

@ApiBearerAuth()
@Controller("file")
@ApiTags("Files")
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * @param id The ID of the product
   * @example "f71ae9a3-5dc9-48c0-8b37-ffc6759bebf4"
   */
  @ApiResponse({
    status: 404,
    schema: {
      example: "Product not found",
    },
  })
  @Post("product/:id")
  @UseInterceptors(FileInterceptor("image"))
  @UseGuards(AuthGuard)
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
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
}
