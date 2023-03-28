import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FileUploadService } from 'src/config/fileUpload';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/post';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/user';
import { s3Bucket } from 'src/config/s3Bucket';
import { FileShowingService } from 'src/config/fileShow';

@Module({
  imports:[TypeOrmModule.forFeature([Posts,User,Profile])], //importing entity in the module than it will be accessible in services
  controllers: [PostsController],
  providers: [PostsService,FileUploadService,s3Bucket,FileShowingService]
})
export class PostsModule {}
