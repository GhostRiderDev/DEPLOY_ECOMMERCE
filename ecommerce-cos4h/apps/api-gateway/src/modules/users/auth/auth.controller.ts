import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseInterceptors,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../users.service";
import { CreateUserDto, UserToSignin } from "../dto/create-user.dto";
import { ValidationPipe } from "../../../pipe/validation.pipe";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("Authentication")
export class AuthController {
  constructor(private readonly usersService: UsersService) {}

  @Post("/signup")
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    schema: {
      example: {
        messsage: "Register sucess",
      },
    },
  })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @ApiResponse({ status: 400, description: "Invalid user" })
  async signup(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const response = await this.usersService.create(createUserDto);
    return response.data;
  }

  @ApiResponse({
    status: 201,
    description: "User registered successfully",
    schema: {
      example: {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      },
    },
  })
  @ApiResponse({ status: 400, description: "Invalid user" })
  @ApiResponse({ status: 404, description: "User not found" })
  @Post("/signin")
  async signin(@Body(new ValidationPipe()) userToSignin: UserToSignin) {
    const response = await this.usersService.sigin(userToSignin);
    return response.data;
  }
}
