import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/user';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { Profile } from './typeorm/entities/profile';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport/dist';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt/dist';
import { Posts } from './typeorm/entities/post';
import { PostsModule } from './posts/posts.module';
import { Images } from './typeorm/entities/image';
@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest',
      entities: [User,Profile,Posts,Images],
      synchronize: true,
  }), UsersModule, ProfileModule,ConfigModule.forRoot({isGlobal:true}),AuthModule,PassportModule,JwtModule, PostsModule],//{envFilePath:'../env'}
  controllers: [AppController],
  providers: [AppService,AuthService,LocalStrategy],
})
export class AppModule {}
