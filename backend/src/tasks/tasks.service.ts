import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './entities/tasks.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { CreateSubtaskDto } from './dto/create-subtask.dto'
import { IsNull } from 'typeorm'

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private tasksRepo: Repository<Task>) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task()
    task.title = createTaskDto.title
    if (createTaskDto.parentId) {
      task.parent =
        (await this.tasksRepo.findOneBy({ id: createTaskDto.parentId })) ??
        undefined
    }
    return this.tasksRepo.save(task)
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepo.find({
      relations: ['subtasks', 'parent'],
      where: {
        parent: IsNull(),
      },
    })
  }

  async createSubtask(
    parentId: number,
    createSubtaskDto: CreateSubtaskDto
  ): Promise<Task> {
    const parentTask = await this.tasksRepo.findOneBy({ id: parentId })

    if (!parentTask) {
      throw new NotFoundException(`Parent task with ID ${parentId} not found`)
    }

    const newSubtask = new Task()
    newSubtask.title = createSubtaskDto.title
    newSubtask.parent = parentTask

    return this.tasksRepo.save(newSubtask)
  }
}
