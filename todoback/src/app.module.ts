import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmModuleOptions } from "./config/orm.config";
import { TaskModule } from "./modules/task/task.module";
import { UserModule } from "./modules/user/user.module";
import { TokenModule } from "./services/token/token.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env"],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...typeOrmModuleOptions,
      }),
    }),
    UserModule,
    TaskModule,
    TokenModule,
  ],
})
export class AppModule {}
