import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { BucketsService } from './buckets.service';

@Module({
  controllers: [FileController],
  providers: [BucketsService]
})
export class S3Module {}
