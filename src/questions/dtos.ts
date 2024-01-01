import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  question: string;
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  question?: string;
}

export class CreateQuestionWithPointsDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  question: string;

  @IsNumber()
  @Min(1)
  points: number;
}
