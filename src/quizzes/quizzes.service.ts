import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './quizzes.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto } from './dtos';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz) private quizzesRepository: Repository<Quiz>,
  ) {}

  getAllQuizzes() {
    return this.quizzesRepository.find();
  }

  async getQuizById(id: number) {
    const quiz = await this.quizzesRepository.findBy({ id });
    return quiz;
  }

  saveQuiz(quiz: CreateQuizDto) {
    const newQuiz = this.quizzesRepository.create(quiz);
    return this.quizzesRepository.save(newQuiz);
  }
}
