import { Quiz } from 'src/quizzes/quizzes.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @OneToMany(
    () => Question,
    (questionWithPoints) => questionWithPoints.question,
  )
  questionsWithPoints: QuestionWithPoints[];
}

@Entity('questions-with-points')
export class QuestionWithPoints {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  points: number;

  @ManyToOne(() => Question, (question) => question.questionsWithPoints)
  question: Question;

  @ManyToOne(() => Quiz, (quiz) => quiz.questionsWithPoints)
  quiz: Quiz;
}
