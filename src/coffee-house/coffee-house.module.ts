import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';

@Module({
  controllers: [CoffeesController],
})
export class CoffeeHouseModule {}
