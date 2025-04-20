import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto } from './entities/task-response';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    const task = new Task();
    task.title = createTaskDto.title;

    if (createTaskDto.parentId) {
      const parent = await this.tasksRepo.findOne({
        where: { id: createTaskDto.parentId },
      });

      if (parent) {
        task.parent = parent;
      }
    }

    const savedTask = await this.tasksRepo.save(task);
    return plainToInstance(TaskResponseDto, savedTask);
  }

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepo.find({
      relations: ['subtasks', 'parent'],
      where: { parent: IsNull() },
    });
    return plainToInstance(TaskResponseDto, tasks);
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepo.delete(id);
  }

  async findSubtasks(id: number): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepo.find({
      where: { parent: { id } },
      relations: ['parent'],
    });
    return plainToInstance(TaskResponseDto, tasks);
  }
}
