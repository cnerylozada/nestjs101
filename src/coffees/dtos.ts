import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(20)
  @MaxLength(50)
  description: string;

  @IsNumber()
  price: number;
}

export class UpdateCoffeeDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
