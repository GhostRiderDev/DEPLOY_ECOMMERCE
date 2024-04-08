import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
  // ParseIntPipe,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationUserPipe } from './pipe/validation.pipe';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationUserPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    if (!page || page < 1) {
      page = 1;
    }
    if (!limit || limit < 1) {
      limit = 10;
    }

    return this.usersService.findAll(page, limit);
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string): Observable<any> {
    const response = this.usersService.findOne(id);
    return response;
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationUserPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
