import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Borrow } from "./Borrow.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Borrow, (borrowing) => borrowing.user)
  @JoinColumn({ name: "borrow_id" })
  borrowings: Borrow[];
}
