import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class UserAppService implements OnModuleInit {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject('MS-ORDERS')
    private readonly clientOrders: ClientKafka,
  ) {}

  async findAll(page: number, limit: number): Promise<any[]> {
    try {
      const users = await this.userRepository.find({
        select: ['id', 'name', 'email', 'phone', 'address', 'country', 'city'],
        skip: (page - 1) * limit,
        take: limit,
      });

      const usersWithOrders = await Promise.all(
        users.map(async (user) => {
          const ordersUser = await firstValueFrom(
            this.clientOrders.send('MS-ORDERS-USER-GET', user.id),
          );

          return { ...user, ...ordersUser };
        }),
      );

      return usersWithOrders;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(
    id: string,
  ): Promise<UserEntity & { orders: { id: string; date: string } }> {
    const userDB = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.email',
        'user.phone',
        'user.address',
        'user.country',
        'user.city',
      ])
      .where('user.id = :id', { id })
      .getOne();

    if (!userDB) {
      return null;
    }
    const response = await firstValueFrom(
      this.clientOrders.send('MS-ORDERS-USER-GET', userDB.id),
    );
    const ordersWithIdAndDate = response.orders.map((order) => {
      return {
        id: order.id,
        date: order.date,
      };
    });
    return { ...userDB, orders: ordersWithIdAndDate };
  }

  async create(user: UserEntity): Promise<ResponseDto> {
    const userDB = await this.userRepository.findOneBy({ email: user.email });
    if (userDB) {
      return { status: 400, data: 'User already exists' };
    }
    await this.userRepository.save(user);
    return { status: 201, data: 'User created' };
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async onModuleInit() {
    this.clientOrders.subscribeToResponseOf('MS-ORDERS-USER-GET');
    await this.clientOrders.connect();
  }
}
