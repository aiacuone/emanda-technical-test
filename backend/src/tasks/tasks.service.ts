import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { plainToInstance } from 'class-transformer';
import { TaskResponseDto, SubtaskResponseDto } from './entities/task-response';

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

      if (!parent) {
        throw new NotFoundException(
          `Parent task with ID ${createTaskDto.parentId} not found`
        );
      }
      task.parent = parent;
    }

    const savedTask = await this.tasksRepo.save(task);
    return plainToInstance(TaskResponseDto, savedTask);
  }

  async findAll(): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepo.find({
      relations: {
        subtasks: {
          parent: true,
        },
        parent: true,
      },
      where: { parent: IsNull() },
    });
    return plainToInstance(TaskResponseDto, tasks);
  }

  async delete(id: number): Promise<void> {
    const result = await this.tasksRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async findSubtasks(id: number): Promise<SubtaskResponseDto[]> {
    const parentTask = await this.tasksRepo.findOne({
      where: { id },
    });

    if (!parentTask) {
      throw new NotFoundException(`Parent task with ID ${id} not found`);
    }

    const tasks = await this.tasksRepo.find({
      where: { parent: { id } },
      relations: {
        parent: true,
      },
    });
    return plainToInstance(SubtaskResponseDto, tasks);
  }
}
