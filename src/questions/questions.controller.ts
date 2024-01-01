import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto, UpdateQuestionDto } from './dtos';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getAllQuestions() {
    return this.questionsService.getQuestions();
  }

  @Post()
  saveQuestion(@Body() newQuestion: CreateQuestionDto) {
    return this.questionsService.saveQuestion(newQuestion);
  }

  @Patch(':id')
  updateQuestion(@Param('id') id: string, @Body() question: UpdateQuestionDto) {
    return this.questionsService.updateQuestion(id, question);
  }
}
