import { Task } from "../../task/entities/task.entity";
import { Column, Entity, JoinColumn, OneToMany } from "typeorm";
import { BaseDateColumn } from "../../../constants";

@Entity({ name: "users" })
export class User extends BaseDateColumn {
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
}
