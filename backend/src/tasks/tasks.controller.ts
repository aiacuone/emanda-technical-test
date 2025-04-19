import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(":id/subtasks")
  findSubtasks(@Param("id") id: string) {
    return this.tasksService.findSubtasks(+id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.delete(+id);
  }
}
