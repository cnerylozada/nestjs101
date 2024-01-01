import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Question, QuestionWithPoints } from './questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto, CreateQuestionWithPointsDto } from './dtos';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(QuestionWithPoints)
    private questionsWithPointsRepository: Repository<QuestionWithPoints>,
  ) {}

  getQuestions() {
    return this.questionsRepository.find();
  }

  saveQuestion(newQuestion: CreateQuestionDto) {
    const question = this.questionsRepository.create(newQuestion);
    return this.questionsRepository.save(question);
  }

  async preloadQuestionWithPoints(
    questionWithPoints: CreateQuestionWithPointsDto,
    quizId?: string,
  ) {
    const existingQuestion = await this.questionsRepository.findOne({
      where: {
        question: questionWithPoints.question,
      },
    });
    if (existingQuestion) {
      if (!!quizId) {
        const existingQuestionWithPoints =
          await this.questionsWithPointsRepository
            .createQueryBuilder('qWPoints')
            .where('qWPoints.quizId = :quizId', { quizId: +quizId })
            .andWhere('qWPoints.questionId = :questionId', {
              questionId: existingQuestion.id,
            })
            .getOne();
        return this.questionsWithPointsRepository.create({
          ...existingQuestionWithPoints,
          points: questionWithPoints.points,
        });
      } else {
        return this.questionsWithPointsRepository.create({
          question: existingQuestion,
          points: questionWithPoints.points,
        });
      }
    } else {
      const newQuestion = await this.questionsRepository.save({
        question: questionWithPoints.question,
      });
      return this.questionsWithPointsRepository.create({
        points: questionWithPoints.points,
        question: newQuestion,
      });
    }
  }
}
