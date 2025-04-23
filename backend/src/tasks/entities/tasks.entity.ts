import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Expose, Transform, Exclude } from 'class-transformer';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @Expose()
  id!: number;

  @Column()
  @Expose()
  title!: string;

  @ManyToOne(() => Task, (task) => task.subtasks)
  @Exclude()
  parent!: Task;

  @OneToMany(() => Task, (task) => task.parent, { cascade: true })
  @Transform(
    ({ value }) =>
      value?.map((subtask: Task) => ({
        id: subtask.id,
        title: subtask.title,
        parentId: subtask.parent?.id,
      })),
    { toPlainOnly: true }
  )
  subtasks!: Task[];
}
