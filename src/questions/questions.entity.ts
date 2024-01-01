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

  @ManyToOne(() => Quiz, (quiz) => quiz.questionsWithPoints, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  quiz: Quiz;

  @ManyToOne(() => Question, (question) => question.questionsWithPoints)
  question: Question;
}
