import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketsService } from './buckets.service';

@Controller('file')
export class FileController {
  constructor(private bucketsService: BucketsService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const objectLink = await this.bucketsService.upload(
      file.originalname,
      file.buffer,
    );
    return objectLink;
  }


  @Delete(':fileName')
  async deleteFileByName(@Param('fileName') fileName: string) {
    return this.bucketsService.deleteFileByName(fileName);
  }
}
