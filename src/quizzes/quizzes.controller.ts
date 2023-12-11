import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dtos';

@Controller('quizzes')
export class QuizzesController {
  constructor(private quizzesService: QuizzesService) {}

  @Get()
  getQuizzes() {
    return this.quizzesService.getAllQuizzes();
  }

  @Get(':id')
  getQuizById(@Param('id', ParseIntPipe) id: number) {
    return this.quizzesService.getQuizById(id);
  }

  @Post()
  saveQuiz(@Body() newQuiz: CreateQuizDto) {
    return this.quizzesService.saveQuiz(newQuiz);
  }
}
