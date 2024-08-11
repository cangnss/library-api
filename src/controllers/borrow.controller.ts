import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { getRepository } from 'typeorm';
import { Borrow } from "../entity/Borrow.entity";

export class BorrowController {
    private borrowRepository = AppDataSource.getRepository(Borrow);

    getBorrows = async (req: Request, res: Response) => {
        try {
            const borrows = await this.borrowRepository.find();
            if (borrows.length > 0) {
                res.status(200).send({ success: true, message: "All borrows listed!", data: borrows })
            }else{
                res.status(404).send({ success: false, message: "Borrow not found!", data: [] })
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }
}