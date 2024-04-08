import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('API-GATEWAY-USERS')
    private readonly gatewayClientUsers: ClientKafka,
  ) {}
  create(createUserDto: CreateUserDto) {
    return this.gatewayClientUsers.emit('MS-USER-POST', createUserDto);
  }

  findAll(page: number, limit: number) {
    return this.gatewayClientUsers.send('MS-USERS-GET', { page, limit });
  }

  findOne(id: string): Observable<any> {
    const user = this.gatewayClientUsers.send('MS-USER-GET', id);
    if (!user) {
      throw new BadRequestException('No existe Usuario con ese id');
    }
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.gatewayClientUsers.emit('MS-USER-PUT', { id, updateUserDto });
  }

  remove(id: string) {
    return this.gatewayClientUsers.emit('MS-USER-DELETE', id);
  }

  async onModuleInit() {
    this.gatewayClientUsers.subscribeToResponseOf('MS-USERS-GET');
    this.gatewayClientUsers.subscribeToResponseOf('MS-USER-GET');
    await this.gatewayClientUsers.connect();
  }
}
