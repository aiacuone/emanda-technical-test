import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;
}
