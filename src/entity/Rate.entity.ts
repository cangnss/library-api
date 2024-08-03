import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User.entity";
import { Book } from "./Book.entity";

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Book, (book) => book.ratings)
  book: Book;

  @Column()
  score: number;

  @Column()
  ratedAt: Date;
}