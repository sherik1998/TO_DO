import { Module } from "@nestjs/common";

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
  ],
})
export class AppModule {}
