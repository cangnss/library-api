import { Router } from "express"
import { UserController } from "../controllers/user.controller";


export const userRoute:Router = Router();

const userController = new UserController();


userRoute.get("/", userController.getUsers)
