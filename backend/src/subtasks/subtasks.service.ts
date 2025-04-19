import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Subtask } from '../tasks/entities/subtask.entity'
import { Task } from '../tasks/entities/tasks.entity'
import { CreateSubtaskDto } from '../tasks/dto/create-subtask.dto'

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask) private subtasksRepo: Repository<Subtask>,
    @InjectRepository(Task) private tasksRepo: Repository<Task>
  ) {}

  async findAll(): Promise<Subtask[]> {
    return this.subtasksRepo.find({
      relations: ['parent'],
    })
  }

  async findOne(id: number): Promise<Subtask> {
    const subtask = await this.subtasksRepo.findOne({
      where: { id },
      relations: ['parent'],
    })

    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found`)
    }

    return subtask
  }

  async create(
    taskId: number,
    createSubtaskDto: CreateSubtaskDto
  ): Promise<Task> {
    const parentTask = await this.tasksRepo.findOne({
      where: { id: taskId },
      relations: ['subtasks'],
    })

    if (!parentTask) {
      throw new NotFoundException(`Parent task with ID ${taskId} not found`)
    }

    const newSubtask = new Subtask()
    newSubtask.title = createSubtaskDto.title
    newSubtask.parent = parentTask

    await this.subtasksRepo.save(newSubtask)

    const updatedTask = await this.tasksRepo.findOne({
      where: { id: taskId },
      relations: ['subtasks'],
    })

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${taskId} not found`)
    }

    return updatedTask
  }

  async remove(id: number): Promise<void> {
    const subtask = await this.subtasksRepo.findOne({
      where: { id },
    })

    if (!subtask) {
      throw new NotFoundException(`Subtask with ID ${id} not found`)
    }

    await this.subtasksRepo.remove(subtask)
  }

  async findByTaskId(taskId: number): Promise<Subtask[]> {
    const parentTask = await this.tasksRepo.findOneBy({ id: taskId })

    if (!parentTask) {
      throw new NotFoundException(`Parent task with ID ${taskId} not found`)
    }

    return this.subtasksRepo.find({
      where: { parent: { id: taskId } },
      relations: ['parent'],
    })
  }
}
