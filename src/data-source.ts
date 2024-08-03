import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";
import { User } from "./entity/User.entity"
import { Book } from "./entity/Book.entity"
import { Borrow } from "./entity/Borrow.entity"
import { Rate } from "./entity/Rate.entity"
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
    entities: [User, Book, Borrow, Rate],
    migrations: [],
    subscribers: [],
})
