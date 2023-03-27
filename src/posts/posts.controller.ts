import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Req, UploadedFile, UseInterceptors } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from 'src/config/fileUpload';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/typeorm/entities/post';
import { Repository } from 'typeorm';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}


  @Post(":id")
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Param("id",ParseIntPipe) id:number, @UploadedFile() file: Express.Multer.File,@Body() dto:CreatePostDto) //using swagger
  {
    console.log(id,dto.Caption,file);
    return this.postsService.upload(id,file.buffer,file.originalname,dto.Caption);
  }

  // @Get()
  // findAll() {
  //   return this.postsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.postsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postsService.update(+id, updatePostDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
