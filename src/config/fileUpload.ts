
import { Injectable } from "@nestjs/common";
import { uuid } from "uuidv4";
import * as aws from '@aws-sdk/client-s3'
@Injectable()
export class FileUploadService{

    constructor(){}
    async uploadFile(dataBuffer:Buffer,fileName:String)
    {
      const s3Bucket=new aws.S3({
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_PASSWORD,
        },
        region:process.env.BUCKET_REGION
      })
      
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