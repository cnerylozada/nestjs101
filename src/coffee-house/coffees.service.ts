import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/Coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dtos/dtos';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private coffeesRepository: Repository<Coffee>,
  ) {}

  getAllCoffees(page: number, limit = 5) {
    return this.coffeesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getCoffeeById(id: string) {
    return this.coffeesRepository.findOneBy({ id });
  }

  saveNewCoffee(coffee: CreateCoffeeDto) {
    const newCoffee = new Coffee();
    newCoffee.name = coffee.name;
    newCoffee.description = coffee.description;
    newCoffee.price = coffee.price;
    return this.coffeesRepository.save(newCoffee);
  }

  async deleteCoffeeById(id: string) {
    await this.coffeesRepository.delete({ id });
    return id;
  }
}
