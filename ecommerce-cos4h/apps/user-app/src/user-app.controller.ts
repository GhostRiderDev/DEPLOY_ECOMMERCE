import { Controller } from '@nestjs/common';
import { UserAppService } from './user-app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserAppController {
  constructor(private readonly userAppService: UserAppService) {}

  @MessagePattern('MS-USERS-GET')
  async getUsers({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }): Promise<any> {
    return await this.userAppService.findAll(page, limit);
  }

  @MessagePattern('MS-USER-GET')
  async getUser(id: string): Promise<any> {
    const userDB = await this.userAppService.findOne(id);
    return JSON.stringify(userDB);
  }

  @EventPattern('MS-USER-POST')
  createUser(user: any): Promise<any> {
    return this.userAppService.create(user);
  }

  @EventPattern('MS-USER-PUT')
  async updateUser(data: { id: string; user }): Promise<any> {
    const response = await this.userAppService.update(data.id, data.user);
    return JSON.stringify(response);
  }

  @EventPattern('MS-USER-DELETE')
  deleteUser(id: string): Promise<void> {
    return this.userAppService.delete(id);
  }
}
