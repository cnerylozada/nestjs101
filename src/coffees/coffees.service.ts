import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './coffees.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto, UpdateCoffeeDto } from './dtos';

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

  async getCoffeeById(id: string) {
    const coffee = await this.coffeesRepository.findOneBy({ id: +id });
    if (!coffee) throw new NotFoundException(`Not found coffee with id: ${id}`);
    return coffee;
  }

  saveNewCoffee(coffee: CreateCoffeeDto) {
    const newCoffee = this.coffeesRepository.create(coffee);
    return this.coffeesRepository.save(newCoffee);
  }

  async updateCoffee(id: string, editedCoffee: UpdateCoffeeDto) {
    const coffee = await this.coffeesRepository.preload({
      id: +id,
      ...editedCoffee,
    });
    return this.coffeesRepository.save(coffee);
  }

  async deleteCoffeeById(id: string) {
    await this.coffeesRepository.delete({ id: +id });
    return id;
  }
}
