import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee, Flavor } from './coffees.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto, CreateFlavorDto, UpdateCoffeeDto } from './dtos';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private flavorsRepository: Repository<Flavor>,
  ) {}

  getAllCoffees(page: number, limit = 5) {
    return this.coffeesRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { flavors: true },
    });
  }

  async getCoffeeById(id: string) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id: +id },
      relations: { flavors: true },
    });
    if (!coffee) throw new NotFoundException(`Not found coffee with id: ${id}`);
    return coffee;
  }

  async preloadFlavors(flavor: CreateFlavorDto) {
    const existingFlavor = await this.flavorsRepository.findOneBy({
      flavor: flavor.flavor,
    });
    if (!!existingFlavor) {
      return existingFlavor;
    }
    return this.flavorsRepository.create({ flavor: flavor.flavor });
  }

  async saveNewCoffee(coffee: CreateCoffeeDto) {
    const flavors = await Promise.all(
      coffee.flavors.map((_) => this.preloadFlavors(_)),
    );
    const newCoffee = this.coffeesRepository.create({
      ...coffee,
      flavors: flavors,
    });
    return this.coffeesRepository.save(newCoffee);
  }

  async updateCoffee(id: string, editedCoffee: UpdateCoffeeDto) {
    const flavors = await Promise.all(
      editedCoffee.flavors.map((_) => this.preloadFlavors(_)),
    );

    const coffee = await this.coffeesRepository.preload({
      id: +id,
      ...editedCoffee,
      flavors: flavors,
    });
    return this.coffeesRepository.save(coffee);
  }

  async deleteCoffeeById(id: string) {
    await this.coffeesRepository.delete({ id: +id });
    return id;
  }
}
