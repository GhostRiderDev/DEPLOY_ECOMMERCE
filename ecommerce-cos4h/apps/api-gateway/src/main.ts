import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import * as morgan from 'morgan';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  // ! app.useGlobalGuards(new AuthGuard());
  // ! app.useGlobalInterceptors(new DateAdderInterceptor());
  app.use(morgan('dev'));
  app.use(cors());

  await app.listen(7777);
}
bootstrap();
