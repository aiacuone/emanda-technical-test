import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  IsInt,
  Min,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  @Transform(({ value }) => value?.trim())
  title!: string;

  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(1)
  parentId?: number;
}
