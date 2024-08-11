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
                return res.status(200).send({ success: true, message: "All borrows listed!", data: borrows })
            }else{
                return res.status(404).send({ success: false, message: "Borrow not found!", data: [] })
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: "Internal server error", error });
        }
    }
}