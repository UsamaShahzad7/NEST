import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/typeorm/entities/profile';
import { User } from 'src/typeorm/entities/user';

@Module({
  imports:[TypeOrmModule.forFeature([Profile,User])],  //using the entity in the module
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
