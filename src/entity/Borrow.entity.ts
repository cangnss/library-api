import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { Book } from "./Book.entity";

@Entity("borrows")
export class Borrow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.borrowings)
  user: number;

  @ManyToOne(() => Book, (book) => book.borrowings)
  book: number;

  @Column()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @Column({ nullable: true, default: 0 })
  rating: number;
}