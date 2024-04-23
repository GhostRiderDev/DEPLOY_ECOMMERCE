import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entity/user.entity";
import { Repository } from "typeorm";
import { ClientKafka } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { ResponseDto } from "./dto/response.dto";
import { kafkaConfig } from "./config/kafka.config";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./enum/roles.enum";

@Injectable()
export class UserAppService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @Inject(kafkaConfig().services.order.name)
    private readonly clientOrders: ClientKafka,
    private readonly jwtService: JwtService,
  ) {}
  async onModuleDestroy() {
    await this.clientOrders.close();
  }
  async onModuleInit() {
    await this.clientOrders.connect();
    this.clientOrders.subscribeToResponseOf("MS-ORDERS-USER-GET");
  }

  async findAll(page: number, limit: number): Promise<any[]> {
    try {
      const users = await this.userRepository.find({
        select: ["id", "name", "email", "phone", "address", "country", "city"],
        skip: (page - 1) * limit,
        take: limit,
      });

      return users;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(
    id: string,
  ): Promise<UserEntity & { orders: { id: string; date: string } }> {
    const userDB = await this.userRepository
      .createQueryBuilder("user")
      .select([
        "user.id",
        "user.name",
        "user.email",
        "user.phone",
        "user.address",
        "user.country",
        "user.city",
      ])
      .where("user.id = :id", { id })
      .getOne();

    if (!userDB) {
      return null;
    }
    const response = await firstValueFrom(
      this.clientOrders.send("MS-ORDERS-USER-GET", userDB.id),
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
      return { status: 400, data: "User already exists" };
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) {
      return { status: 400, data: "Password not can be hashed" };
    }
    await this.userRepository.save({
      ...user,
      password: hashedPassword,
      role: Role.USER,
    });
    return { status: 201, data: "User created" };
  }

  async signIn(user: Partial<UserEntity>): Promise<ResponseDto> {
    const userDB = await this.userRepository.findOneBy({ email: user.email });
    if (!userDB) {
      return { status: 404, data: "Unauthorized" };
    }

    const isPasswordValid = await bcrypt.compare(
      user.password,
      userDB.password,
    );

    if (!isPasswordValid) {
      return { status: 401, data: "Unauthorized" };
    }

    const userPayload = {
      id: userDB.id,
      email: userDB.email,
      name: userDB.name,
      role: userDB.role,
    };

    const token = this.jwtService.sign(userPayload);

    return { status: 201, data: { token } };
  }

  async update(id: string, user: UserEntity): Promise<UserEntity> {
    await this.userRepository.update(id, { ...user });
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
