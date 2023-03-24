import { IsNotEmpty } from "class-validator"
import { IsEmail } from "class-validator"
import { MinLength } from "class-validator"
import { IsString } from "class-validator"


export class CreateUserDto{
    
    @IsEmail()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password:string        
}