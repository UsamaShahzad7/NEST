import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FileUploadService } from 'src/config/fileUpload';

@Module({

  controllers: [PostsController],
  providers: [PostsService,FileUploadService]
})
export class PostsModule {}
