import { Request, Response } from "express"
import { AppDataSource } from "../data-source";
import { User } from "../entity/User.entity";
import { Borrow } from "../entity/Borrow.entity";
import { Book } from "../entity/Book.entity";

export class UserController {
    private userRepository = AppDataSource.getRepository(User);
    private borrowRepository = AppDataSource.getRepository(Borrow);
    private bookRepository = AppDataSource.getRepository(Book);

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await this.userRepository.find();
            if (users.length > 0) {
                res.status(200).send({ success: true, message: "All users listed!", data: users })
            }else{
                res.status(404).send({ success: false, message: "User not found!", data: [] })
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(error)
        }
    }

    addUser = async (req: Request, res: Response) => {
        try {
            const { name } = await req.body;
            console.log(name)
            const user = new User()
            user.name = name

            await this.userRepository.save(user);
            return res.status(201).send({ success: true, message: "User is added!", data: user })

        } catch (error) {
            res.status(500).send(error)
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const user = await this.userRepository.findOneBy({ id: parseInt(req.params.userId) })
            if (user == null) {
                res.status(404).send({ success: false, message: "User not found!" })
            } else {
                res.status(200).send({ success: true, data: user })
            }

        } catch (error) {
            res.status(500).send(error)
        }
    }

    borrowBook = async (req: Request, res: Response) => {
        try {
            const { userId, bookId } = await req.params;

            const isBookBorrowed = await this.borrowRepository
                .createQueryBuilder("borrow")
                .where("borrow.book = :bookId", { bookId: parseInt(bookId) })
                .andWhere("borrow.returnDate IS NULL")
                .getMany();

            if (isBookBorrowed.length > 0) {
                return res.status(500).send({ success: false, message: "Book is already borrowed by another user" });
            }
            const borrow = new Borrow();
            borrow.user = parseInt(userId);
            borrow.book = parseInt(bookId);
            borrow.borrowDate = new Date();

            const book = await this.bookRepository.findOne({ where: { id: parseInt(bookId) } })
            book.ratingCount = book.ratingCount + 1

            await this.bookRepository.save(book);
            await this.borrowRepository.save(borrow);
            res.status(201).send({ success: true, message: "Book is borrowed", data: borrow })
        } catch (error) {
            res.status(500).send(error)
        }
    }

    returnBook = async (req: Request, res: Response) => {
        try {
            const { userId, bookId } = req.params;
            const { score } = req.body;

            const isBookBorrowed = await this.borrowRepository
                .createQueryBuilder("borrow")
                .where("borrow.book = :bookId", { bookId: parseInt(bookId) })
                .andWhere("borrow.user = :userId", { userId: parseInt(userId) })
                .andWhere("borrow.returnDate IS NULL")
                .getOne();

            if (isBookBorrowed) {
                // Kitabı güncelle
                const book = await this.bookRepository.findOne({ where: { id: parseInt(bookId) } });
                if (book) {
                    book.rating += score;
                    await this.bookRepository.save(book);
                } else {
                    return res.status(404).send({ success: false, message: "Book not found!" });
                }
                isBookBorrowed.rating = score;
                isBookBorrowed.returnDate = new Date();

                await this.borrowRepository.save(isBookBorrowed);
                return res.status(200).send({ success: true, message: "Borrowed book is returned!", data: isBookBorrowed });
            } else {
                return res.status(404).send({ success: false, message: "Borrowed book is not found or already returned!" });
            }

        } catch (error) {
            res.status(500).send(error)
        }
    }
}