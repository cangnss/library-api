import { Router } from "express"
import { BookController } from "../controllers/book.controller";
import { checkBookId, validateRequest } from "../validations/validateRequest";
import { createBookSchema } from "../validations/bookValidations";


export const bookRoute:Router = Router();

const bookController = new BookController();


bookRoute.get("/", bookController.getBooks)
bookRoute.post("/", validateRequest(createBookSchema), bookController.addBook);
bookRoute.get("/:bookId", checkBookId,  bookController.getBook) 
