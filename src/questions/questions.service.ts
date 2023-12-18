import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question } from './questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dtos';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  getQuestions() {
    return this.questionsRepository.find()
  }

  saveQuestion(newQuestion: CreateQuestionDto) {
    const question = this.questionsRepository.create(newQuestion);
    return this.questionsRepository.save(question);
  }
}
