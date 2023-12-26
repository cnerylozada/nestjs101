import { QuestionWithPoints } from 'src/questions/questions.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  creationDate?: Date;

  @OneToMany(
    () => QuestionWithPoints,
    (questionWithPoints) => questionWithPoints.quiz,
    { cascade: true },
  )
  questionsWithPoints: QuestionWithPoints[];
}
