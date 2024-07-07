import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

class AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

export default AbstractEntity; 
