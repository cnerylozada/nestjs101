import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BucketsService } from './buckets.service';

@Controller('file')
export class FileController {
  constructor(private bucketsService: BucketsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const objectLink = await this.bucketsService.uploadFile(
      file.originalname,
      file.buffer,
    );
    return objectLink;
  }

  @Put()
  @UseInterceptors(FileInterceptor('image'))
  async updateFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() keyFile: { key: string },
  ) {
    const objectLink = await this.bucketsService.updateFile(
      keyFile.key,
      file.buffer,
    );
    return objectLink;
  }

  @Delete(':fileName')
  async deleteFileByName(@Param('fileName') fileName: string) {
    return this.bucketsService.deleteFileByName(fileName);
  }
}
