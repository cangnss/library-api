import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { getRepository } from 'typeorm';
import { User } from "../entity/User.entity";
import { Book } from "../entity/Book.entity";

export class BookController {
    private bookRepository = AppDataSource.getRepository(Book);

    getBooks = async (req: Request, res: Response) => {
        try {
            const books = await this.bookRepository.find();
            if (books.length > 0) {
                return res.status(200).send({ success: true, message: "All books listed!", data: books });
            } else {
                return res.status(404).send({ success: false, message: "No books found!", data: [] });
            }
        } catch (error) {
            console.log("error: ", error)
            res.status(500).send(error)
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
            res.status(500).send(error)
        }
    }

    getBook = async (req: Request, res:Response) => {
        try {
            const book = await this.bookRepository.findOneBy({ id: parseInt(req.params.bookId) })
            if (book == null) {
                res.status(404).send({ success: false, message: "Book not found!" })
            }else{
                res.status(200).send({ success: true, data: book })
            }
            
        } catch (error) {
            res.status(500).send(error)
        }
    }
}