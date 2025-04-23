import { Expose, Transform, Exclude } from 'class-transformer';
import { Task } from './tasks.entity';

export class TaskResponseDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Exclude()
  parent?: Task;

  @Expose()
  @Transform(({ obj }) =>
    obj.subtasks?.map((subtask: Task) => ({
      id: subtask.id,
      title: subtask.title,
      parentId: subtask.parent?.id,
    }))
  )
  subtasks?: { id: number; title: string; parentId: number }[];
}

export class SubtaskResponseDto extends TaskResponseDto {
  @Exclude()
  subtasks?: never;

  @Expose()
  @Transform(({ obj }) => obj.parent?.id)
  parentId?: number;
}
