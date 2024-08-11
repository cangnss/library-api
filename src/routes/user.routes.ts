import { Router } from "express"
import { UserController } from "../controllers/user.controller";
import { checkUserId, validateRequest } from "../validations/validateRequest";
import { createUserSchema } from "../validations/userValidations";


export const userRoute:Router = Router();

const userController = new UserController();


userRoute.get("/", userController.getUsers)
userRoute.get("/:userId", checkUserId,  userController.getUser)
userRoute.post("/", validateRequest(createUserSchema), userController.addUser);
userRoute.post("/:userId/borrow/:bookId", userController.borrowBook)
userRoute.post("/:userId/return/:bookId", userController.returnBook)
