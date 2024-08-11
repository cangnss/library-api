import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.entity";
import { Book } from "./Book.entity";

@Entity("borrows")
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.borrowings)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Book, (book) => book.borrowings)
  @JoinColumn({ name: "book_id" })
  book: Book;

  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @Column({ nullable: true, default: 0 })
  rating: number;
}