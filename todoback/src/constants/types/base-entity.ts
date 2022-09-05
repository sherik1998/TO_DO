import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseDateColumn {
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'now()',
    nullable: false,
  })
  updatedAt: Date;
}
