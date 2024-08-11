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
                return res.status(200).send({ success: true, message: "All users listed!", data: users })
            } else {
                return res.status(404).send({ success: false, message: "User not found!", data: [] })
            }
        } catch (error) {
            return res.status(500).send({ success: false, message: "Internal server error", error });
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
            return res.status(500).send({ success: false, message: "Internal server error", error });
        }
    }

    getUser = async (req: Request, res: Response) => {
        try {
            const userId = parseInt(req.params.userId);

            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return res.status(404).send({ success: false, message: "User not found!" });
            }

            const pastBooks = await this.borrowRepository
                .createQueryBuilder("borrow")
                .leftJoinAndSelect("borrow.book", "book")
                .where("borrow.user = :userId", { userId })
                .andWhere("borrow.returnDate IS NOT NULL")
                .getMany();

            const past = pastBooks.map(borrow => ({
                name: borrow.book.name,
                userScore: borrow.rating
            }));

            const presentBooks = await this.borrowRepository
                .createQueryBuilder("borrow")
                .leftJoinAndSelect("borrow.book", "book")
                .where("borrow.user = :userId", { userId })
                .andWhere("borrow.returnDate IS NULL")
                .getMany();

            const present = presentBooks.map(borrow => ({
                name: borrow.book.name
            }));

            const responseData = {
                id: user.id,
                name: user.name,
                books: {
                    past,
                    present
                }
            };

            return res.status(200).send({ success: true, data: responseData });

        } catch (error) {
            return res.status(500).send({ success: false, message: "Internal server error", error });
        }
    }

    borrowBook = async (req: Request, res: Response) => {
        try {
            const { userId, bookId } = req.params;
    
            const isBookBorrowed = await this.borrowRepository
                .createQueryBuilder("borrow")
                .where("borrow.book = :bookId", { bookId: parseInt(bookId) })
                .andWhere("borrow.returnDate IS NULL")
                .getMany();
    
            if (isBookBorrowed.length > 0) {
                return res.status(400).send({ success: false, message: "Book is already borrowed by another user" });
            }
    
            const user = await this.userRepository
                .createQueryBuilder("user")
                .where("user.id = :id", { id: parseInt(userId) })
                .getOne();
    
            const book = await this.bookRepository
                .createQueryBuilder("book")
                .where("book.id = :id", { id: parseInt(bookId) })
                .getOne();
    
            if (!user || !book) {
                return res.status(404).send({ success: false, message: "User or book not found" });
            }
    
            const borrow = new Borrow();
            borrow.user = user;
            borrow.book = book;
            borrow.borrowDate = new Date();

            book.ratingCount = book.ratingCount + 1;
    
            await this.bookRepository.save(book);
            await this.borrowRepository.save(borrow);
    
            return res.status(201).send({ success: true, message: "Book is borrowed", data: borrow });
        } catch (error) {
            console.error("Error borrowing book: ", error);
            return res.status(500).send({ success: false, message: "Internal server error", error });
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
            return res.status(500).send({ success: false, message: "Internal server error", error });
        }
    }
}