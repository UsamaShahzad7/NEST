import { Injectable } from "@nestjs/common";
import * as aws from '@aws-sdk/client-s3';
@Injectable()
export class s3Bucket{
   s3Bucket(){
    const s3Bucket=new aws.S3({
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_PASSWORD,
        },
        region:process.env.BUCKET_REGION
      })
      return s3Bucket;
   }
}

