import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './entities/tasks.entity'
import { CreateTaskDto } from './dto/create-task.dto'

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task()
    task.title = createTaskDto.title
    return this.tasksRepo.save(task)
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepo.find({
      relations: ['subtasks'],
    })
  }

  async removeTask(id: number): Promise<void> {
    const task = await this.tasksRepo.findOne({
      where: { id },
      relations: ['subtasks'],
    })

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`)
    }

    await this.tasksRepo.remove(task)
  }
}
