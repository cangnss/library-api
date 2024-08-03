import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as express from "express"
import { Express } from "express"
import "reflect-metadata";
const app: Express = express()

const PORT = process.env.PORT || 8001

AppDataSource.initialize().then(async () => {

    console.log("connected!")

}).catch(error => console.log(error))



app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})




