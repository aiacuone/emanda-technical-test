import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './entities/tasks.entity'
import { Subtask } from './entities/subtask.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { CreateSubtaskDto } from './dto/create-subtask.dto'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
    @InjectRepository(Subtask) private subtasksRepo: Repository<Subtask>
  ) {}

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

  async createSubtask(
    parentId: number,
    createSubtaskDto: CreateSubtaskDto
  ): Promise<Task> {
    const parentTask = await this.tasksRepo.findOne({
      where: { id: parentId },
      relations: ['subtasks'],
    })

    if (!parentTask) {
      throw new NotFoundException(`Parent task with ID ${parentId} not found`)
    }

    const newSubtask = new Subtask()
    newSubtask.title = createSubtaskDto.title
    newSubtask.parent = parentTask

    await this.subtasksRepo.save(newSubtask)
    const updatedTask = await this.tasksRepo.findOne({
      where: { id: parentId },
      relations: ['subtasks'],
    })

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${parentId} not found`)
    }

    return updatedTask
  }

  async findSubtasks(parentId: number): Promise<Subtask[]> {
    const parentTask = await this.tasksRepo.findOneBy({ id: parentId })

    if (!parentTask) {
      throw new NotFoundException(`Parent task with ID ${parentId} not found`)
    }

    return this.subtasksRepo.find({
      where: { parent: { id: parentId } },
    })
  }
}
