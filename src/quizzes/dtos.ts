import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

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
}
