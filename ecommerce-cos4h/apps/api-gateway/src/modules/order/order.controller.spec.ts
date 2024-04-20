import { Test, TestingModule } from "@nestjs/testing";
import { OrderController } from "./order.controller";
import { JwtService } from "@nestjs/jwt";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";
import { NotFoundException } from "@nestjs/common";
import { OrderDto } from "apps/order-app/src/dto/order.dto";

describe("Order Controller", () => {
  let orderController: OrderController;
  let mockJwtService: Partial<JwtService>;
  let mockOrderService: Partial<OrderService>;

  const orderToSave: CreateOrderDto = {
    id_user: "e7fc8b48-cd3e-446f-8f28-ede96a7d314d",
    ids_products: [
      "a98d4816-c440-49cd-af2a-5f10f227d7c9",
      "a9fa3570-f5d3-45ad-85f5-ac8354328d5c",
    ],
  };
  beforeAll(async () => {
    mockOrderService = {
      create: (orderDto: OrderDto) =>
        Promise.resolve({ status: 201, data: "sucess" }),
    };
    const orderModule: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: JwtService, useValue: mockJwtService },
        { provide: OrderService, useValue: mockOrderService },
      ],
    }).compile();

    orderController = orderModule.get<OrderController>(OrderController);
  });

  it("OrderController  defined", () => {
    expect(orderController).toBeDefined();
  });

  it("Create order sucess", async () => {
    const response = await orderController.create(orderToSave);
    expect(response.status).toBe(201);
  });

  it("Create order failed if service throw error", async () => {
    jest.spyOn(mockOrderService, "create").mockImplementation(() => {
      return Promise.reject(new NotFoundException("User not found"));
    });

    try {
      await orderController.create(orderToSave);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error.message).toEqual("User not found");
    }
  });
});
