import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from 'src/users/dto/UpdateUser.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UsersService, private jwtService:JwtService){}

    async validateUser(email:string,password:string){
        console.log("Service:",email,password);
        const result=await this.userService.getUserandPass(email);
        console.log("Service Result",result);

        if(result)
        {
            const check=await bcrypt.compare(password,result.password)
            if(check)
            {
                return result;
            }
        }
        else
        {
            return null;
        }
    }

    async login(user:UpdateUserDto){
        const payload={userEmail:user.email}
        const jwt=this.jwtService.sign(payload)
        return{
            access_token:jwt,
        };
    }
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJoYW16YS50ZGNAZ21haWwuY29tIiwiaWF0IjoxNjc5NTg5MjMxLCJleHAiOjE2Nzk1OTI4MzF9.q-2wnQnOu8vCx9JSQSjMz6k9vDn7T4abQZHwPtYRKL0
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ1c2FtYS50ZGNAZ21haWwuY29tIiwiaWF0IjoxNjc5NTg5Mzc1LCJleHAiOjE2Nzk1OTI5NzV9.Z03UZ-JbDnRYgiP5XTQiCv_drrfrub5wH7ahZbR09w4'