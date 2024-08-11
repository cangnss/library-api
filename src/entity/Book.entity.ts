import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Borrow } from "./Borrow.entity";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column("float", { default: 0 })
  rating: number;

  @Column("int", { default: 0 })
  ratingCount: number;

  @OneToMany(() => Borrow, (borrowing) => borrowing.book)
  borrowings: Borrow[];
}