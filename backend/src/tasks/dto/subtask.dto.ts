import { IsNotEmpty, IsString } from 'class-validator'

export class SubtaskDto {
  @IsNotEmpty()
  @IsString()
  title!: string

  id!: number
  parentId!: number
}
