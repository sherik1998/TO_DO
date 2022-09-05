import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
    allowedHeaders:
      "Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,Cache-Control",
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  await app.listen(configService.get<number>("APP_PORT") || 7777, () => {
    Logger.log(
      `Application running on port: ${
        configService.get<number>("APP_PORT") || 7777
      } 🚀`,
      "Main"
    );
  });
}

void bootstrap();
