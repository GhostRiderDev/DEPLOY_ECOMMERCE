import { NestFactory } from "@nestjs/core";
import { ApiGatewayModule } from "./api-gateway.module";
import * as morgan from "morgan";
import * as cors from "cors";
import { auth } from "express-openid-connect";
import { config as auth0Config } from "./config/auth0.config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  // ! app.useGlobalGuards(new AuthGuard());
  // ! app.useGlobalInterceptors(new DateAdderInterceptor());

  app.use(morgan("dev"));
  app.use(cors());
  app.use(auth(auth0Config));

  const config = new DocumentBuilder()
    .setTitle("Ecommerce backend")
    .setDescription("The products ecommerce")
    .setVersion("1.0")
    .addTag("ecommerce")
    .addSecurity("bearer", {
      type: "http",
      scheme: "bearer",
    })
    .addOAuth2(
      {
        type: "oauth2",
        flows: {
          implicit: {
            authorizationUrl: `http://localhost:7777/login`,
            scopes: {
              openid: "Open Id",
            },
          },
        },
      },
      "Auth0",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(7777);
}
bootstrap();
