import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, In, Repository} from 'typeorm'
import { User } from 'src/typeorm/entities/user';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    

    // constructor(@InjectRepository(User) private userRepository:Repository<User>,){}
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}
    async getUsers(){
        const data=await this.userRepository.find();
        if(data.length>0)
        {
            return data;
        }
        else
        {
            throw new NotFoundException("User not found");
        }
    }

    async createUsers(createUserDto:CreateUserDto){
        const email=createUserDto.email;
        let password=createUserDto.password;
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(password,salt);
        password=hashPass;
        const newUser=this.userRepository.create({email,password,createdAt:new Date()})
        const id=newUser.id;
        try{
            const saveUser=await this.userRepository.save(newUser);
            return {"Created at":email};
        }catch(error)
        {
            return {"Error while creating a user: ":error.sqlMessage};
        }
    }

    async updateUser(id:number,updateUserDto:UpdateUserDto)
    {
        
        const email=updateUserDto.email;
        let password=updateUserDto.password;
        const salt=await bcrypt.genSalt(10);
        const hashPass=await bcrypt.hash(password,salt);
        password=hashPass;
        const check=await this.userRepository.find({where:{id:In([id])}}); //checking if the user exist or not
        if(check.length>0)
        {
            try{
                const result=await this.userRepository.update(id,{email:email,password:password});
                return "User Updated";
            }catch(error)
            {
                return error;
            }
        }
        else
        {
            return "User not found";
        }
    }

    async deleteUser(id:number)
    {
      
        const check=await this.userRepository.find({where:{id:In([id])}}); //checking if the user exist or not
        if(check.length>0)
        {   
            
            try{
                const result=await this.userRepository.delete(id);
                return "Record Deleted";
            }catch(error)
            {
                return {error};
            }
        }
        else
        {
            return "User not found";
        }
    }
    async getUserbyEmail(email:string)
    {   
        //getting the profile of a specific user using qurey builder
       const result=await this.userRepository.createQueryBuilder("user")
       .select("user.email").leftJoinAndSelect("user.profile","profile").where("user.email=:UserEmail",{UserEmail:email}).getOne();
       console.log("Result:",result);
       return result;
    }
    async getUserandPass(email:string)
    {
        const result=await this.userRepository.createQueryBuilder("user")
        .select().where("user.email=:UserEmail",{UserEmail:email}).getOne();
        if(result)
        {
            return {"email":result.email,"password":result.password};
        }else{
            return null;
        }
        
    }
}
