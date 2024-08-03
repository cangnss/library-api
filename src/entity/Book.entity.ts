import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Borrow } from "./Borrow.entity";
import { Rate } from "./Rate.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Borrow, (borrowing) => borrowing.book)
  borrowings: Borrow[];

  @OneToMany(() => Rate, (rating) => rating.book)
  ratings: Rate[];
}