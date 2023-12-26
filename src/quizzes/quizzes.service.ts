import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './quizzes.entity';
import { Repository } from 'typeorm';
import { CreateQuizDto, UpdateQuizDto } from './dtos';
import { QuestionsService } from 'src/questions/questions.service';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz) private quizzesRepository: Repository<Quiz>,
    private questionsService: QuestionsService,
  ) {}

  getAllQuizzes() {
    return this.quizzesRepository.find({
      relations: ['questionsWithPoints', 'questionsWithPoints.question'],
    });
  }

  async getQuizById(id: number) {
    const quiz = await this.quizzesRepository.findBy({ id });
    return quiz;
  }

  async saveQuiz(quizDto: CreateQuizDto) {
    const questionsWithPoints = await Promise.all(
      quizDto.questions.map((_) =>
        this.questionsService.preloadQuestionWithPoints(_),
      ),
    );
    const newQuiz = this.quizzesRepository.create({
      ...quizDto,
      questionsWithPoints,
    });
    return this.quizzesRepository.save(newQuiz);
  }

  async updateQuiz(quizId: string, quizDto: UpdateQuizDto) {
    const quiz = await this.quizzesRepository.preload({
      id: +quizId,
      ...quizDto,
    });
    return this.quizzesRepository.save(quiz);
  }
}
