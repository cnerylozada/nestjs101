import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { CreateCoffeeDto } from './dtos/dtos';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCoffees() {
    return this.coffeesService.getAllCoffees();
  }

  @Get(':id')
  @HttpCode(HttpStatus.FOUND)
  getCooffeeById(@Param('id') id: string) {
    return this.coffeesService.getCoffeeById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  saveNewCoffee(@Body() coffee: CreateCoffeeDto) {
    return this.coffeesService.saveNewCoffee(coffee);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.FOUND)
  deleteCoffeeById(@Param('id') id: string) {
    return this.coffeesService.deleteCoffeeById(id);
  }
}
