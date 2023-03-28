
import { Injectable } from "@nestjs/common";
import * as aws from '@aws-sdk/client-s3'
import { s3Bucket } from "./s3Bucket";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "src/typeorm/entities/profile";
import { Repository } from "typeorm";
import { Posts } from "src/typeorm/entities/post";
//import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; //use the older version 3.173
import getUrl from '@aws-sdk/s3-request-presigner'


@Injectable()
export class FileShowingService{
   constructor(private readonly s3BucketConfig:s3Bucket,
    @InjectRepository(Profile) private profileRepository:Repository<Profile>,
    @InjectRepository(Posts) private postRepository:Repository<Posts>){}
   
    async ShowFiles(id:number){

        //const s3BucketData=this.s3BucketConfig.s3Bucket();
        const Images=await this.postRepository.createQueryBuilder("post").select("Profile.firstname").addSelect("Profile.lastname").addSelect("post.ImageName").addSelect("post.Caption").
        leftJoin("post.profile","Profile").where("post.ProfileId=:id",{id:id}).getMany();
        return Images;
        // const urlArray=[];
        // for(const x of Images)
        // {
        //     const params={
        //         Bucket:process.env.BUCKET_NAME,
        //         Key:x.name,
        //     }
        //     const command=new aws.GetObjectCommand(params);
        //     const url=await getUrl.getSignedUrl(s3BucketData,command);
        // }
    }
    
    
}