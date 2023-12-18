import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  question: string;
}
