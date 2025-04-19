import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'
import { Task } from './entities/tasks.entity'
import { Subtask } from './entities/subtask.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Task, Subtask])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
