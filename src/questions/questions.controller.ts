import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dtos';

@Controller('questions')
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  getAllQuestions(){
    return this.questionsService.getQuestions()
  }

  @Post()
  saveQuestion(@Body() newQuestion: CreateQuestionDto){
    return this.questionsService.saveQuestion(newQuestion)
  }
}
