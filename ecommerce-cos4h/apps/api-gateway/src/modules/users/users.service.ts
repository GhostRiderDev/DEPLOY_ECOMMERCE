import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto, UserToSignin } from "./dto/create-user.dto";
import { ClientKafka } from "@nestjs/microservices";
import { Observable, firstValueFrom } from "rxjs";
import { kafkaConfig } from "../../config/kafka.config";
import { OrderService } from "../order/order.service";
import { UserDto } from "apps/user-app/src/dto/user.dto";
import { ResponseDto } from "../../dto/response.dto";

// name: kafkaConfig().services.user.name
@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject("SERVICIO-USUARIO")
    private readonly gatewayClientUsers: ClientKafka,
    private readonly orderService: OrderService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const response: ResponseDto = await firstValueFrom(
      this.gatewayClientUsers.send("MS-USER-POST", createUserDto),
    );
    if (response.status !== 201) {
      throw new BadRequestException(response.data);
    }

    return response;
  }

  async sigin(userToLogin: UserToSignin) {
    const response: ResponseDto = await firstValueFrom(
      this.gatewayClientUsers.send("MS-USER-SIGNIN", userToLogin),
    );
    if (response.status !== 201) {
      throw new UnauthorizedException(response.data);
    }
    return response;
  }

  async findAll(page: number, limit: number) {
    try {
      const users: UserDto[] = await firstValueFrom(
        this.gatewayClientUsers.send("MS-USERS-GET", { page, limit }),
      );

      const usersWithOrders = await Promise.all(
        users.map(async (user) => {
          try {
            const ordersUser = await this.orderService.findUserOrders(user.id);
            return { ...user, ...ordersUser };
          } catch (error) {
            return user;
          }
        }),
      );
      return usersWithOrders;
    } catch (error) {
      console.log("******Error**********", error);
    }
  }

  findOne(id: string): Observable<any> {
    const user = this.gatewayClientUsers.send("MS-USER-GET", id);
    if (!user) {
      throw new BadRequestException("No existe Usuario con ese id");
    }
    return user;
  }

  update(id: string, updateUserDto: Partial<CreateUserDto>) {
    return this.gatewayClientUsers.emit("MS-USER-PUT", { id, updateUserDto });
  }

  remove(id: string) {
    return this.gatewayClientUsers.emit("MS-USER-DELETE", id);
  }

  async onModuleInit() {
    this.gatewayClientUsers.subscribeToResponseOf("MS-USERS-GET");
    this.gatewayClientUsers.subscribeToResponseOf("MS-USER-GET");
    this.gatewayClientUsers.subscribeToResponseOf("MS-USER-POST");
    this.gatewayClientUsers.subscribeToResponseOf("MS-USER-SIGNIN");
    await this.gatewayClientUsers.connect();
  }
}
