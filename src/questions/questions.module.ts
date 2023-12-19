import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question, QuestionWithPoints } from './questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionWithPoints])],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [QuestionsService]
})
export class QuestionsModule {}
