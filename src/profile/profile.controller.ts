import { Controller, ParseIntPipe } from '@nestjs/common';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { createProfile } from './dto/createProfile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  

  //@UseGuards(JwtAuthGaurd)
  @Get(":id")
  async createProfile(@Param("id",ParseIntPipe) id:number, @Body() createProfileDto:createProfile){
      
      const result=await this.profileService.createProfile(id,createProfileDto);
      return result;
  }
}
