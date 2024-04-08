import { Module } from '@nestjs/common';
import { AuthAppController } from './auth-app.controller';
import { AuthAppService } from './auth-app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CredentialEntity } from './entity/credential.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: '172.31.52.151',
      port: 3306,
      database: 'Auth_MS',
      username: 'cos4h',
      password: 'R@@t123',
      entities: [CredentialEntity],
      synchronize: true,
      logging: ['error'],
    }),
  ],
  controllers: [AuthAppController],
  providers: [AuthAppService],
})
export class AuthAppModule {}
