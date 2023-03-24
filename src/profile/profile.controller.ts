import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Param, Post } from '@nestjs/common/decorators';
import { createProfile } from './dto/createProfile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  
  @Post(":id")
  async createProfile(@Param("id",ParseIntPipe) id:number, @Body() createProfileDto:createProfile){
      
      const result=await this.profileService.createProfile(id,createProfileDto);
      return result;
  }
}
