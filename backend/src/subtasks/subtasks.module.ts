import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SubtasksController } from './subtasks.controller'
import { SubtasksService } from './subtasks.service'
import { Task } from '../tasks/entities/tasks.entity'
import { Subtask } from '../tasks/entities/subtask.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Task, Subtask])],
  controllers: [SubtasksController],
  providers: [SubtasksService],
})
export class SubtasksModule {}
