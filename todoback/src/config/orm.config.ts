import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { config } from "dotenv";

config();

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: "postgres",
  port: 5432,
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [__dirname + "/../**/entities/*.entity.{ts,js}"],
  synchronize: false,
  autoLoadEntities: true,
  migrationsRun: true,
  logging: false,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: "migrations",
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
export default OrmConfig;
