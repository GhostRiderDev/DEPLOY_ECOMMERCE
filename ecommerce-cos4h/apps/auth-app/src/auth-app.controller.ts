import { Controller } from '@nestjs/common';
import { AuthAppService } from './auth-app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AuthAppController {
  constructor(private readonly authAppService: AuthAppService) {}

  @MessagePattern('MS-AUTH-REGISTER')
  register(): string {
    return this.authAppService.getHello();
  }

  @MessagePattern('MS-AUTH-LOGIN')
  login(): string {
    return this.authAppService.getHello();
  }
}
