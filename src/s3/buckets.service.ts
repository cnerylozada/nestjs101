import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BucketsService {
  private bucket = 'nestjs101-s3';
  private s3Client = new S3Client({
    region: this.configService.get('aws.region'),
    credentials: {
      accessKeyId: this.configService.get('aws.accessKey'),
      secretAccessKey: this.configService.get('aws.secretAccessKey'),
    },
  });

  constructor(private configService: ConfigService) {}

  async uploadFile(fileNameWithExtension: string, fileBuffer: Buffer) {
    const extensionIndex = fileNameWithExtension.lastIndexOf('.');
    const extension = fileNameWithExtension.slice(extensionIndex + 1);
    const fileName = `avatar_${Date.now()}`;
    const key = `images/${fileName}.${extension}`;
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: fileBuffer,
      }),
    );
    return `https://${this.bucket}.s3.amazonaws.com/${key}`;
  }

  async updateFile(key: string, fileBuffer: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        Body: fileBuffer,
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
