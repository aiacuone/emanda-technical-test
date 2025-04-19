import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Subtask } from './subtask.entity'

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  title!: string

  @OneToMany(() => Subtask, (subtask) => subtask.parent)
  subtasks!: Subtask[]
}
