import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUploadService } from 'src/config/fileUpload';
import { Posts } from 'src/typeorm/entities/post';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/user';
import { In, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor( private fileUploadService:FileUploadService,
    @InjectRepository(Posts) private postRepository:Repository<Posts>,
    @InjectRepository(Profile) private profileRepository:Repository<Profile>,
    @InjectRepository(User) private userRepository:Repository<User>){}

  async upload(id:number ,fileBuffer:Buffer,fileName:String,caption:string)
  {
    try{
      const uniqueName=await this.fileUploadService.uploadFile(fileBuffer,fileName);
      const imageCaption=caption;
      const imageName=uniqueName;

      const data=this.postRepository.create({Caption:imageCaption,ImageName:imageName,createdAt:new Date()})
      const savedData=await this.postRepository.save(data);
      const profileId=await this.profileRepository.findOne({where:{id:In[(id)]}}); //user exist ka check lag skta
      savedData.profile=profileId;
      return await this.postRepository.save(savedData);

    }catch(error)
    {
      return error;
    }
   
  }
 /* create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }*/
}
