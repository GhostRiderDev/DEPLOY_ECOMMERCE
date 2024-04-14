import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    ClientsModule.register([
      {
        name: 'MS-FILES',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'CONSUMER-FILE',
          },
        },
      },
    ]),
  ],
})
export class FileModule {}
