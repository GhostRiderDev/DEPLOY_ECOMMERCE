import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAppService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  findAll(page: number, limit: number): Promise<UserEntity[]> {
    return this.userRepository.find({
      select: ['id', 'name', 'email', 'phone', 'address', 'country', 'city'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findOne(id: string): Promise<UserEntity> {
    const userDB = this.userRepository
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
      throw new Error('User not found');
    }
    return userDB;
  }

  async create(user: UserEntity): Promise<string> {
    return (await this.userRepository.save(user)).id;
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
