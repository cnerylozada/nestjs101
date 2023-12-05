import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dtos';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {
  constructor(private coffeesService: CoffeesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  getAllCoffees(@Query() paginationQuery: { page: number; limit: number }) {
    const { page, limit } = paginationQuery;
    return this.coffeesService.getAllCoffees(page, limit);
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

  @Patch(':id')
  updateCoffee(@Param('id') id: string, @Body() coffee: UpdateCoffeeDto) {
    return this.coffeesService.updateCoffee(id, coffee);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.FOUND)
  deleteCoffeeById(@Param('id') id: string) {
    return this.coffeesService.deleteCoffeeById(id);
  }
}
