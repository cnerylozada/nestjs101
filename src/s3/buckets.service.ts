import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BucketsService {
  private bucket = 'nestjs101-s3';
  private s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIARZCWO7OIKS4RRPF4',
      secretAccessKey: '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',
    },
  });

  async upload(fileNameWithExtension: string, file: Buffer) {
    const extensionIndex = fileNameWithExtension.lastIndexOf('.');
    const extension = fileNameWithExtension.slice(extensionIndex + 1);
    const fileName = `avatar_${Date.now()}`;
    const key = `images/${fileName}.${extension}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: file,
      }),
    );
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  async deleteFileByName(name: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: `images/${name}`,
      }),
    );
    return name;
  }
}
