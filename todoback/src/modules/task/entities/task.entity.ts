import { User } from "../../user/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tasks" })
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @Column({ type: "text", nullable: true })
  text: string | null;

  @Column({ default: false })
  isCheck: boolean;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

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
