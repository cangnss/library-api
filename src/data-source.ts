import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";
dotenv.config();



export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
})
