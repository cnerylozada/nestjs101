import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dtos/dtos';

@Controller('coffees')
export class CoffeesController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCoffees() {
    return 'all my coffees';
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  getCooffeeById(@Param('id') id: string) {
    return `coffee with id: ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  saveNewCoffee(@Body() createCoffee: CreateCoffeeDto) {
    return createCoffee;
  }
}
