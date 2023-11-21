import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(20)
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  password: string;
}
