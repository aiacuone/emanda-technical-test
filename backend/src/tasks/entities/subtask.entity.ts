import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Task } from './tasks.entity'

@Entity()
export class Subtask {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @ManyToOne(() => Task, (task) => task.subtasks)
  @JoinColumn()
  parent!: Task
}
