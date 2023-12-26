import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';

export class CreateFlavorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  flavor: string;
}

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

  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => CreateFlavorDto)
  flavors: CreateFlavorDto[];
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateFlavorDto)
  flavors?: CreateFlavorDto[];
}
