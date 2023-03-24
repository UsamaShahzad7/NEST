import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { JwtModule } from '@nestjs/jwt/dist';
import { forwardRef } from '@nestjs/common/utils';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

//Circular dependency occuring between auth and user because both are depending on each other

//Resolving circular dependency by using forwardRef on both sides
@Module({
  imports:[forwardRef(()=>UsersModule),PassportModule,JwtModule.register({
    secret:'UsAmAShAhZad', 
    signOptions:{expiresIn:'3600s'}
  })],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
