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
  UpdateDateColumn,
} from "typeorm";
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Employee from "./employee.entity";

@Entity() //decorator
class Department extends AbstractEntity {
  @Column({ unique: true })
  department_name: string;

  @Column()
  description: string;

  @OneToMany(() => Employee, (employee) => employee.department, {
    cascade: true,
    onDelete: "CASCADE",
  })
  employee: Employee;
}

export default Department;
