import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksModule } from './tasks/tasks.module'
import { SubtasksModule } from './subtasks/subtasks.module'
import { Task } from './tasks/entities/tasks.entity'
import { Subtask } from './tasks/entities/subtask.entity'
import { join } from 'path'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'db.sqlite'),
      entities: [Task, Subtask],
      synchronize: true,
    }),
    TasksModule,
    SubtasksModule,
  ],
})
export class AppModule {}
