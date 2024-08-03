import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";

export class UserController{
    getUsers = async (req: Request, res: Response) => {
        try {
            const userRepository = AppDataSource.getRepository(User);
            const users = await userRepository.find();
            if (users.length > 0) {
                res.status(200).send({ success: true, message: "All users listed!", data: users })
            }
            res.status(404).send({ success: false, message: "User not found!", data: [] })
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const userRepository = AppDataSource.getRepository(User);
            
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
}