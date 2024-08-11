import { AppDataSource } from "./data-source"
import express, { Express} from "express"
import expressWinston from "express-winston"
import { userRoute } from "./routes/user.routes"
import bodyParser from "body-parser";
import { bookRoute } from "./routes/book.routes";
import { borrowRoute } from "./routes/borrow.routes";
import { logger, internalErrorLogger } from "./utils/logger";
import "reflect-metadata";
const app:Express = express()

const PORT = process.env.PORT || 8001

AppDataSource.initialize().then(async () => {

    console.log("connected!")

}).catch(error => console.log(error))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

app.use(expressWinston.errorLogger({
    winstonInstance: internalErrorLogger
}))

app.use("/users", userRoute)
app.use("/books", bookRoute)
app.use("/borrows", borrowRoute)


app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})




