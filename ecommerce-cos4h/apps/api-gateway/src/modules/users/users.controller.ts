import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
  ParseUUIDPipe,
  Put,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Observable } from "rxjs";
import { CreateUserDto } from "./dto/create-user.dto";
import { ValidationPipe } from "../../pipe/validation.pipe";
import { AuthGuard } from "../../guards/Auth.guard";
import { Roles } from "../../decorator/Roles.decorator";
import { Role } from "../../enum/roles.enum";
import { RoleGuard } from "../../guards/Role.guard";
import { ApiBearerAuth, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("users")
@ApiTags("Users")
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(200)
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: "7c24ea5b-7a29-496d-9f8a-f1c452d70259",
          name: "olvadis",
          email: "olvadis9000@gmail.com",
          phone: "+57-3045432345",
          address: "CL 99B CARERRA 98A-12",
          country: "colombia",
          city: "Medellin",
          orders: [
            {
              date: "2024-04-18T23:13:20.714Z",
              id_user: "7c24ea5b-7a29-496d-9f8a-f1c452d70259",
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
                  {
                    id: "a9fa3570-f5d3-45ad-85f5-ac8354328d5c",
                    name: "Samsung Galaxy S23",
                    description: "The best smartphone in the world",
                    price: "150.00",
                    stock: 12,
                    imageUrl:
                      "https://res.cloudinary.com/dxarrcpas/image/upload/v1713135787/products/kla7dvosy7r7ssyrvdq4.jpg",
                    idCategory: 1,
                  },
                ],
                id: "6621a910da3bd0a8cae30c8c",
              },
              id: "6621a910da3bd0a8cae30c8d",
            },
          ],
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

    return this.usersService.findAll(page, limit);
  }

  @Get(":id")
  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: "397ebd37-fedb-4b93-9f11-d68006b29143",
        name: "olvadis",
        email: "olvadis8@gmail.com",
        phone: "+57-3045432345",
        address: "CL 99B CARERRA 98A-12",
        country: "colombia",
        city: "Medellin",
        orders: [],
      },
    },
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        message: "User not found",
      },
    },
  })
  /**
   * @param id The ID of the user
   * @example "f71ae9a3-5dc9-48c0-8b37-ffc6759bebf4"
   */
  findOne(@Param("id", new ParseUUIDPipe()) id: string): Observable<any> {
    const response = this.usersService.findOne(id);
    return response;
  }

  /**
   * @param id The ID of the user
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
      example: "user updated sucessfully",
    },
  })
  @ApiResponse({
    status: 400,
    schema: {
      example: "Invalid user",
    },
  })
  @Put(":id")
  @HttpCode(201)
  @UseGuards(AuthGuard)
  update(
    @Param("id", new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateUserDto: Partial<CreateUserDto>,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  /**
   * @param id The ID of the user
   * @example "f71ae9a3-5dc9-48c0-8b37-ffc6759bebf4"
   */
  @ApiResponse({
    status: 204,
  })
  @ApiResponse({
    status: 404,
    schema: {
      example: {
        message: "User not found",
      },
    },
  })
  @HttpCode(204)
  @Delete(":id")
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  remove(@Param("id", new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
