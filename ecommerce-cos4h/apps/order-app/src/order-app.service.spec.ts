import { Test } from "@nestjs/testing";
import { OrderAppService } from "./order-app.service";
import { OrderDetailService } from "./module/order-detail/order-detail/order-detail.service";
import { Types } from "mongoose";
import { getModelToken } from "@nestjs/mongoose";
import { OrderDto } from "./dto/order.dto";

describe("OrderService", () => {
  let orderAppService: OrderAppService;

  const orderToSave: OrderDto = {
    id_user: "e7fc8b48-cd3e-446f-8f28-ede96a7d314d",
    ids_products: [
      "a98d4816-c440-49cd-af2a-5f10f227d7c9",
      "a9fa3570-f5d3-45ad-85f5-ac8354328d5c",
    ],
  };

  beforeAll(async () => {
    const mockOrderDetailService: Partial<OrderDetailService> = {
      create: () =>
        Promise.resolve({
          status: 201,
          data: new Types.ObjectId("abcd-1234"),
        }),
      calculateTotalPrice: () => 400,
    };
    const module = await Test.createTestingModule({
      providers: [
        OrderAppService,
        {
          provide: OrderDetailService,
          useValue: mockOrderDetailService,
        },
        {
          provide: getModelToken("Order"),
          useValue: {},
        },
        {
          provide: "user-kafka-client",
          useValue: {},
        },
      ],
    }).compile();

    orderAppService = module.get<OrderAppService>(OrderAppService);

    orderAppService.saveOrder = (orderDto: OrderDto) => {
      if (
        orderDto.ids_products.includes("a98d4816-c440-49cd-af2a-5f10f227d7ce")
      ) {
        return Promise.resolve({
          status: 404,
          data: "Product not found",
        });
      }

      if (orderDto.id_user === "e7fc8b48-cd3e-446f-8f28-ede96a7d314e") {
        return Promise.resolve({
          status: 404,
          data: "User not found",
        });
      }

      return Promise.resolve({
        status: 201,
        data: "sucess",
      });
    };
  });
  it("Create a instance of OrderAppService", async () => {
    expect(orderAppService).toBeDefined();
  });

  it("Create order sucess", async () => {
    const response = await orderAppService.saveOrder(orderToSave);
    expect(response.status).toBe(201);
  });

  it("if some product not exist return 404", async () => {
    const orderToSaveLocal = {
      ...orderToSave,
      ids_products: ["a98d4816-c440-49cd-af2a-5f10f227d7ce"],
    };
    const response = await orderAppService.saveOrder(orderToSaveLocal);

    expect(response.status).toBe(404);
    expect(response.data).toEqual("Product not found");
  });

  it("if some product not exist return 404", async () => {
    const orderToSaveLocal = {
      id_user: "e7fc8b48-cd3e-446f-8f28-ede96a7d314e",
      ids_products: orderToSave.ids_products,
    };
    const response = await orderAppService.saveOrder(orderToSaveLocal);

    expect(response.status).toBe(404);
    expect(response.data).toEqual("User not found");
  });

  expect(orderAppService).toBeDefined;
});
