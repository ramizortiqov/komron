import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { join } from 'path';

@Injectable()
export class FilesService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    const filename = `${Date.now()}-${file.originalname}`;
    const uploadPath = join(process.cwd(), 'uploads', filename);

    // Optimize image with sharp
    await sharp(file.buffer)
      .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(uploadPath);

    return `/uploads/${filename}`;
  }

  async deleteImage(filepath: string): Promise<void> {
    // Delete file logic
  }
}
