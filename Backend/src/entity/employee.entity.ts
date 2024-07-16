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

@Entity() //decorator
class Employee extends AbstractEntity {
  @Column()
  @Unique(["email"])
  email: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  age: number;

  @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete: "CASCADE",
  })
  address: Address;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  role: string;

  @JoinColumn()
  @ManyToOne(() => Department, (department) => department.employee)
  department: Department;
}

export default Employee;
