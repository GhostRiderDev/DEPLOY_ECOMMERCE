import {
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  // Req,
  UseGuards,
  // UseInterceptors,
} from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientKafka } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { AuthGuard } from './guards/Auth.guard';
// import { DateAdderInterceptor } from './interceptors/dateAdder.interceptor';

@Controller('gateway')
export class ApiGatewayController implements OnModuleInit {
  constructor(
    private readonly apiGatewayService: ApiGatewayService,
    @Inject('API-GATEWAY-PRODUCTS')
    private readonly gatewayClientProducts: ClientKafka,
  ) {}

  // @Get('users')
  // @UseInterceptors(DateAdderInterceptor)
  // async getUsers(@Req() request): Promise<Observable<any>> {
  //   try {
  //     console.log('Dentro de getUsers', request.now);

  //     const users = await this.gatewayClientUsers.send('MS-USERS-GET', {});
  //     return users;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  @Get('products')
  @UseGuards(AuthGuard)
  async getProducts(): Promise<Observable<any>> {
    try {
      const products = await this.gatewayClientProducts.send(
        'MS-PRODUCTS-GET',
        {},
      );
      return products;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('product/:id')
  getProduct(@Param('id') id: string): Observable<any> {
    try {
      return this.gatewayClientProducts.send('MS-PRODUCT-GET', id);
    } catch (error) {
      console.log(error);
    }
  }

  async onModuleInit() {
    // this.gatewayClientUsers.subscribeToResponseOf('MS-USERS-GET');
    this.gatewayClientProducts.subscribeToResponseOf('MS-PRODUCT-GET');
    this.gatewayClientProducts.subscribeToResponseOf('MS-PRODUCTS-GET');
    // await this.gatewayClientUsers.connect();
    await this.gatewayClientProducts.connect();
  }
}
