import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quizzes.entity';
import { QuestionsModule } from 'src/questions/questions.module';

@Module({
  imports: [QuestionsModule, TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
