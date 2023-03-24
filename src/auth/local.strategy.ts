import { Injectable } from "@nestjs/common/decorators";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from 'passport-local'
import { AuthService } from "./auth.service";



@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){
        super({usernameField: 'email',
        passwordField: 'password'})   //by default is me user name or password hta ha is lie usse override krna prta ha
    }

    async validate(email:string,password:string)
    {
        console.log("Local:",email,password);
        const result=await this.authService.validateUser(email,password);
        if(!result)
        {
            return result;
        }
        else
        {
            return result;
        }
    }
}