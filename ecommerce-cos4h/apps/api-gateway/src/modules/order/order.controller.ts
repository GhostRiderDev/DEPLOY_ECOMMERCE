import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
  Put,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UUID } from 'crypto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createOrderDto: CreateOrderDto) {
    const response = await this.orderService.create(createOrderDto);
    if (response.status !== 201) {
      throw new NotFoundException(response.data);
    }
    return response;
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ValidationPipe()) id: string) {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', new ValidationPipe()) id: string,
    @Body(new ValidationPipe()) updateOrderDto: Partial<CreateOrderDto>,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', new ValidationPipe()) id: string) {
    return this.orderService.remove(id);
  }
}
