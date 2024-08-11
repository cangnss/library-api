import { Router } from "express"
import { BorrowController } from "../controllers/borrow.controller";
import { validateRequest } from "../validations/validateRequest";
import { createUserSchema } from "../validations/userValidations";


export const borrowRoute:Router = Router();

const borrowController = new BorrowController();


borrowRoute.get("/", borrowController.getBorrows)
