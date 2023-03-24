import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/user';
import { In, Repository } from 'typeorm';
import { createProfile } from './dto/createProfile.dto';

@Injectable()
export class ProfileService {
    constructor(@InjectRepository(Profile) private profileRepository:Repository<Profile>,
    @InjectRepository(User) private userRepository:Repository<User>){}
    
    async createProfile(id:number,createProfileDto:createProfile)
    {
        console.log(createProfileDto);
        const createProfile=this.profileRepository.create(createProfileDto);
        try{    
            const saveProfile=await this.profileRepository.save(createProfile);
            console.log("Save profile:",saveProfile);
            const getUsers=await this.userRepository.findOne({where:{id:In([id])}});
            console.log("Get Users:",getUsers);
            console.log("Profile in User before:",getUsers.profile);//check what happen when you spread it 
            getUsers.profile=saveProfile;
            console.log("Profile in User After:",getUsers.profile);
            console.log("User After:",getUsers);
            this.userRepository.save(getUsers);
            return "Profile Created at";
        }catch(error)
        {
            return error;
        }
    }
}
