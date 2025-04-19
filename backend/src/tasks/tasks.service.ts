import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Task } from './entities/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;

    if (createTaskDto.parentId) {
      const parent = await this.tasksRepo.findOne({
        where: { id: createTaskDto.parentId },
        relations: ['subtasks'],
      });

      if (parent) {
        task.parent = parent;
        if (!parent.subtasks) {
          parent.subtasks = [];
        }
        parent.subtasks.push(task);
        await this.tasksRepo.save(parent);
      }
    }

    const savedTask = await this.tasksRepo.save(task);
    return this.sanitizeTask(savedTask);
  }

  async findAll(): Promise<Task[]> {
    const tasks = await this.tasksRepo.find({
      relations: ['subtasks', 'parent'],
      where: { parent: IsNull() }, // Only fetch root tasks
    });
    return tasks.map((task) => this.sanitizeTask(task));
  }

  async delete(id: number): Promise<void> {
    await this.tasksRepo.delete(id);
  }

  async findSubtasks(id: number): Promise<Task[]> {
    const tasks = await this.tasksRepo.find({
      where: { parent: { id } },
      relations: ['subtasks', 'parent'],
    });
    return tasks.map((task) => this.sanitizeTask(task));
  }

  private sanitizeTask(task: Task): any {
    return {
      id: task.id,
      title: task.title,
      parentId: task.parent?.id,
      subtasks: task.subtasks?.map((subtask) => ({
        id: subtask.id,
        title: subtask.title,
        parentId: task.id,
      })),
    };
  }
}
