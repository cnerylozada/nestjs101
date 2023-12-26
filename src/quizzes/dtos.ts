import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateQuestionWithPointsDto } from 'src/questions/dtos';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateQuestionWithPointsDto)
  @ValidateNested({ each: true })
  questions: CreateQuestionWithPointsDto[];
}

export class UpdateQuizDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  title: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(30)
  description: string;
}
