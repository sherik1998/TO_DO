import { Task } from "../../task/entities/task.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "text", select: false, nullable: true })
  password: string | null;

  @OneToMany(() => Task, (task) => task.user, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  tasks: Task[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "now()",
    nullable: false,
  })
  updatedAt: Date;
}
