import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(20)
  @MaxLength(50)
  description: string;
}
