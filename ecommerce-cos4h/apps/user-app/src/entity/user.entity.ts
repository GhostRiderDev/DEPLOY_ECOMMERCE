import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../enum/roles.enum";

@Entity("User")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar2", length: 50, nullable: false })
  name: string;

  @Column({ type: "varchar2", length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar2", length: 100, nullable: false })
  password: string;

  @Column({ type: "varchar2", length: 20, nullable: false })
  phone: string;

  @Column({ type: "varchar2", nullable: false })
  address: string;

  @Column({ type: "varchar2", length: 20, nullable: false })
  country: string;

  @Column({ type: "varchar2", length: 30, nullable: false })
  city: string;

  @Column({ type: "varchar2", nullable: false, length: 20 })
  role: string;
}
