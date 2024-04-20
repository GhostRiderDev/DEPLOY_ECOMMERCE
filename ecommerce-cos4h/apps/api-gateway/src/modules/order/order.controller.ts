import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { AuthGuard } from "../../guards/Auth.guard";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Orders")
@Controller("orders")
@ApiBearerAuth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 201,
    description: "Order registered successfully",
    schema: {
      example: {
        messsage: "Register sucess",
      },
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: "Invalid Order",
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: "Some product not found",
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: "user not found",
    },
  })
  async create(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createOrderDto: CreateOrderDto,
  ) {
    const response = await this.orderService.create(createOrderDto);
    if (response.status !== 201) {
      throw new NotFoundException(response.data);
    }
    return response;
  }

  @Get()
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          date: "2024-04-11T01:49:48.793Z",
          id_user: "4b66750c-7ee6-48f8-abbe-69a8cf215d89",
          order_detail_id: {
            price: 349.99,
            products: [
              {
                id: "a98d4816-c440-49cd-af2a-5f10f227d7c9",
                name: "Iphone 15",
                description: "The best smartphone in the world",
                price: "199.99",
                stock: 12,
                imageUrl:
                  "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2023/12/iPhone15_Pink_PDP_Image_Position-1__MXLA.jpg",
                idCategory: 1,
              },
            ],
            id: "661741bc52122a00dcafc856",
          },
          id: "661741bc52122a00dcafc855",
        },
      ],
    },
  })
  @ApiQuery({ name: "page", required: false, example: "1" })
  @ApiQuery({ name: "limit", required: false, example: "10" })
  findAll(@Query("page") page: number, @Query("limit") limit: number) {
    if (!page || page < 1) {
      page = 1;
    }
    if (!limit || limit < 1) {
      limit = 10;
    }
    return this.orderService.findAll(page, limit);
  }

  /**
   * @param id The ID of the order
   * @example "f71ae9a3-5dc9-48c0-8b37-ffc6759bebf4"
   */
  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        date: "2024-04-11T01:49:48.793Z",
        id_user: "4b66750c-7ee6-48f8-abbe-69a8cf215d89",
        order_detail_id: {
          price: 349.99,
          products: [
            {
              id: "a98d4816-c440-49cd-af2a-5f10f227d7c9",
              name: "Iphone 15",
              description: "The best smartphone in the world",
              price: "199.99",
              stock: 12,
              imageUrl:
                "https://d2ihpvt6nd5q28.cloudfront.net/wp-content/uploads/2023/12/iPhone15_Pink_PDP_Image_Position-1__MXLA.jpg",
              idCategory: 1,
            },
          ],
          id: "661741bc52122a00dcafc856",
        },
        id: "661741bc52122a00dcafc855",
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: "order not found",
    },
  })
  findOne(
    @Param("id", new ValidationPipe())
    id: string,
  ) {
    return this.orderService.findOne(id);
  }

  /**
   * @param id The ID of the order
   * @example "f71ae9a3-5dc9-48c0-8b37-ffc6759bebf4"
   */
  @ApiResponse({
    status: 404,
    schema: {
      example: "order not found",
    },
  })
  @ApiResponse({
    status: 201,
    schema: {
      example: "order updated sucessfully",
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: "Some product not found",
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: "user not found",
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: "Invalid order",
    },
  })
  @Put(":id")
  @HttpCode(201)
  @UseGuards(AuthGuard)
  update(
    @Param("id", new ValidationPipe()) id: string,
    @Body(new ValidationPipe()) updateOrderDto: Partial<CreateOrderDto>,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  /**
   * @param id The ID of the order
   * @example "f71ae9a3-5dc9-48c0-8b37-ffc6759bebf4"
   */

  @ApiResponse({
    status: 404,
    schema: {
      example: "order not found",
    },
  })
  @ApiResponse({
    status: 204,
  })
  @Delete(":id")
  @UseGuards(AuthGuard)
  @HttpCode(204)
  remove(@Param("id", new ValidationPipe()) id: string) {
    return this.orderService.remove(id);
  }
}
