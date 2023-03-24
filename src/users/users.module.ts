import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/typeorm/entities/user';
import {TypeOrmModule} from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module';
import { forwardRef } from '@nestjs/common/utils';
import { JwtStrategy } from 'src/auth/jwt.strategy';

//Circular dependency occuring between auth and user because both are depending on each other

//Resolving circular dependency by using forwardRef on both sides

@Module({
  imports:[TypeOrmModule.forFeature([User]),forwardRef(()=>AuthModule)], //getting the repository as a type orm repository
  providers: [UsersService,JwtStrategy],
  controllers: [UsersController],
  exports:[UsersService]
})
export class UsersModule {}
