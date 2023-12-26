import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto, UpdateQuizDto } from './dtos';

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

  @Patch(':id')
  updateQuiz(@Param('id') id: string, @Body() quiz: UpdateQuizDto) {
    return this.quizzesService.updateQuiz(id, quiz);
  }
}
