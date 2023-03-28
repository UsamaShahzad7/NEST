
import { Injectable } from "@nestjs/common";
import { uuid } from "uuidv4";
import * as aws from '@aws-sdk/client-s3'
import { s3Bucket } from "./s3Bucket";
@Injectable()
export class FileUploadService{

    constructor(private readonly s3BucketConfig:s3Bucket){}
    async uploadFile(dataBuffer:Buffer,fileName:String)
    {
      
        const s3Bucket=this.s3BucketConfig.s3Bucket();
       const params={
            Bucket: process.env.BUCKET_NAME,
            Body:dataBuffer,
            Key:`${uuid()}-${fileName}`,
        }
        const command=new aws.PutObjectCommand(params);
        try{
            const data=await s3Bucket.send(command);
            const uniqueName=`${uuid()}-${fileName}`;
            return uniqueName;
        }catch(error)
        {
            return error;
        }
    }
    
    
    
}