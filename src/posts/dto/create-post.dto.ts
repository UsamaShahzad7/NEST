import { ApiProperty } from "@nestjs/swagger/dist"
import { IsNotEmpty } from "class-validator"

export class CreatePostDto {

    
    image:string
    
    @ApiProperty({type:'String'})
    Caption:string
}
