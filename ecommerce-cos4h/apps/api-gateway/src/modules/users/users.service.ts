import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ClientKafka } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('API-GATEWAY-USERS')
    private readonly gatewayClientUsers: ClientKafka,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const response = await firstValueFrom(
      this.gatewayClientUsers.send('MS-USER-POST', createUserDto),
    );
    return response;
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

  update(id: string, updateUserDto: Partial<CreateUserDto>) {
    return this.gatewayClientUsers.emit('MS-USER-PUT', { id, updateUserDto });
  }

  remove(id: string) {
    return this.gatewayClientUsers.emit('MS-USER-DELETE', id);
  }

  async onModuleInit() {
    this.gatewayClientUsers.subscribeToResponseOf('MS-USERS-GET');
    this.gatewayClientUsers.subscribeToResponseOf('MS-USER-GET');
    this.gatewayClientUsers.subscribeToResponseOf('MS-USER-POST');
    await this.gatewayClientUsers.connect();
  }
}
