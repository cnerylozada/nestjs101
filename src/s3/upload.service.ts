import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  private bucket = 'nestjs101-s3';
  private s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: 'AKIARZCWO7OIH3VQYOIJ',
      secretAccessKey: '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',
    },
  });

  async upload(fileNameWithExtension: string, file: Buffer) {
    const extensionIndex = fileNameWithExtension.lastIndexOf('.');
    const extension = fileNameWithExtension.slice(extensionIndex + 1);
    const fileName = `${fileNameWithExtension.substring(
      0,
      extensionIndex,
    )}_${Date.now()}`;
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
}
