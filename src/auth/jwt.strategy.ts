
import { PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-jwt"; //diffrent for jwt
import {ExtractJwt} from 'passport-jwt'   //was importing it wrong
import { Request } from "express";
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            ignoreExpiration: false,
            secretOrKey:'UsAmAShAhZad',
            //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest:ExtractJwt.fromExtractors([(request:Request) => {
                let data = request?.cookies["LoginToken"];
                if(!data){
                    return null;
                }
                console.log("Data:",data,"Data.Token",data.token);
                return data;
            }])
        });
    }

    async validate(payload:any)
    {
        console.log(payload.userEmail);
        return payload.userEmail;
    }
}