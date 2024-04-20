import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { ApiGatewayModule } from "../src/api-gateway.module";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { kafkaConfig } from "../src/config/kafka.config";

describe("ApiGatewayController (e2e)", () => {
  let app: INestApplication;
  let orders = [];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ApiGatewayModule,
        ClientsModule.register([
          {
            name: "SERVICIO-USUARIO",
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: "CLIENTE-USUARIO",
                brokers: [kafkaConfig().broker],
              },
              consumer: {
                groupId: "GRUPO-USUARIO",
              },
            },
          },
          {
            name: "SERVICIO-ORDEN",
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: "CLIENTE-ORDEN",
                brokers: [kafkaConfig().broker],
              },
              consumer: {
                groupId: "GRUPO-ORDEN",
              },
            },
          },
        ]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.connectMicroservice({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: "CLIENTE-USUARIO",
          brokers: [kafkaConfig().broker],
        },
        consumer: {
          groupId: "GRUPO-USUARIO",
        },
      },
    });
    await app.startAllMicroservices();
    await app.init();
  }, 400000);

  it("/ (GET ORDERS)", async () => {
    const req = await request(app.getHttpServer()).get("/orders");
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
    if (req.status === 200) {
      orders = req.body;
    }
  });

  it("/ (GET ORDER IF EXIST)", async () => {
    const reqToken = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        email: "olvadis8@gmail.com",
        password: "12345abcD@",
      });
    console.log("TOKEN********", reqToken.body);

    const req = await request(app.getHttpServer()).get(
      `/orders/${orders[0].id}`,
    );
    expect(req.status).toBe(200);
  }, 50000);

  afterAll(async () => {
    await app.close();
  }, 20000);
});
