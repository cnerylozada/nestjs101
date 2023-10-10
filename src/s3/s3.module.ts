import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { UploadService } from './upload.service';

@Module({
  controllers: [FileController],
  providers: [UploadService]
})
export class S3Module {}
