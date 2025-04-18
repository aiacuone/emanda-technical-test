import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { CreateSubtaskDto } from './dto/create-subtask.dto'
import { Task } from './entities/tasks.entity'

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto)
  }

  @Get()
  findAll() {
    return this.tasksService.findAll()
  }

  @Post(':id/subtasks')
  createSubtask(
    @Param('id', ParseIntPipe) id: number,
    @Body() createSubtaskDto: CreateSubtaskDto
  ): Promise<Task> {
    return this.tasksService.createSubtask(id, createSubtaskDto)
  }

  @Get(':id/subtasks')
  findSubtasks(@Param('id', ParseIntPipe) id: number): Promise<Task[]> {
    return this.tasksService.findSubtasks(id)
  }
}
