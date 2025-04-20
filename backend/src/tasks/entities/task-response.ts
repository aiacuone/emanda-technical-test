import { Expose } from 'class-transformer';

export class TaskResponseDto {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  parentId?: number;

  @Expose()
  subtasks?: { id: number; title: string; parentId: number }[];
}
