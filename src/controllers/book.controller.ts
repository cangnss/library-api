import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { getRepository } from 'typeorm';
import { User } from "../entity/User.entity";
import { Book } from "../entity/Book.entity";
import { Borrow } from "../entity/Borrow.entity";

export class BookController {
    private bookRepository = AppDataSource.getRepository(Book);
    private borrowRepository = AppDataSource.getRepository(Borrow);

    getBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.bookRepository.find();
            if (books.length > 0) {
                return res.status(200).send({ success: true, message: "All books listed!", data: books });
            } else {
                return res.status(404).send({ success: false, message: "No books found!", data: [] });
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: "Internal server error", error });
        }
    }

    addBook = async (req: Request, res: Response) => {
        try {
            const { name } = await req.body;
            const book = new Book()
            book.name = name

            await this.bookRepository.save(book);
            return res.status(201).send({ success: true, message: "Book is added!", data: book })

        } catch (error) {
            return res.status(500).send({ success: false, message: "Internal server error", error });
        }
    }

    getBook = async (req: Request, res: Response) => {
        try {
            const bookId = parseInt(req.params.bookId);
    
            const book = await this.bookRepository.findOne({ where: { id: bookId } });
    
            if (!book) {
                return res.status(404).send({ success: false, message: "Book not found!" });
            }
    
            const { averageScore } = await this.borrowRepository
                .createQueryBuilder("borrow")
                .select("AVG(borrow.rating)", "averageScore")
                .where("borrow.book = :bookId", { bookId })
                .getRawOne();
    
            const response = {
                id: book.id,
                name: book.name,
                score: averageScore ? parseFloat(averageScore).toFixed(2) : -1,
            };
    
            return res.status(200).send({ success: true, data: response });
        } catch (error) {
            return res.status(500).send({ success: false, message: "Internal server error", error });
        }
    }
}