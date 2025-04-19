import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common'
import { CreateSubtaskDto } from '../tasks/dto/create-subtask.dto'
import { Task } from '../tasks/entities/tasks.entity'
import { SubtasksService } from './subtasks.service'

@Controller('subtasks')
export class SubtasksController {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Post(':taskId')
  create(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() createSubtaskDto: CreateSubtaskDto
  ): Promise<Task> {
    return this.subtasksService.create(taskId, createSubtaskDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subtasksService.remove(id)
  }
}
