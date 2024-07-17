import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";
import { Role } from "../utils/role.enum";
import { Status } from "../utils/status.enum";

@Entity() //decorator
class Employee extends AbstractEntity {
  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  experience: string;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: Role;

  @Column({ nullable: true })
  status: Status;

  @JoinColumn()
  @ManyToOne(() => Department, (department) => department.employee)
  department: Department;
}

export default Employee;
