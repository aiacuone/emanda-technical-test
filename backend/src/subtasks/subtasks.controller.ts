import { Controller, Get, Post, Body, Delete } from '@nestjs/common'
import { CreateSubtaskDto } from '../tasks/dto/create-subtask.dto'
import { Task } from '../tasks/entities/tasks.entity'
import { SubtasksService } from './subtasks.service'

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post()
  create(
    @Body() createSubtaskDto: CreateSubtaskDto & { taskId: number }
  ): Promise<Task> {
    const { taskId, ...subtaskData } = createSubtaskDto
    return this.subtasksService.create(taskId, subtaskData)
  }

  @Delete()
  remove(@Body() body: { id: number }): Promise<void> {
    return this.subtasksService.remove(body.id)
  }
}
