import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Delete, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common/decorators';
import { response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGaurd } from 'src/auth/jwt-auth.gaurd';
import { LocalAuthGuard } from 'src/auth/local-auth.gaurd';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService:UsersService,private authService:AuthService){}

    @UseGuards(JwtAuthGaurd)
    @Get()
    getUsers(){
        const result=this.userService.getUsers();
        return result;
    }

    //@UseGuards(JwtAuthGaurd)
    @Get(":email")
    getUserByEmail(@Param("email") email:string)
    {   
        console.log(email);
        return this.userService.getUserbyEmail(email);
    }

    @UseGuards(LocalAuthGuard)
    @Post("login")
    async login( @Body() dto:CreateUserDto ,@Res({ passthrough: true }) res)
    {
        //console.log("Hi I am controller",process.env.JWTSECRET,typeof(process.env.JWTSECRET));
        const LoginToken=await this.authService.login(dto);
        console.log("Access token:",LoginToken);
        res.cookie('LoginToken',LoginToken.access_token);
        return "Logged in succesfully";
    }


    @Post()
    async createUsers(@Body() Dto:CreateUserDto){
        const data=await this.userService.createUsers(Dto)
        console.log(data);
        return `profile/${data}`;
    }

    @Patch(":id")
    async updateUser(@Param("id",ParseIntPipe) id:number,@Body() UpdateDto:UpdateUserDto)
    {
        const data=await this.userService.updateUser(id,UpdateDto)
        return {data};
    }

    @Delete(":id")
    async deleteUser(@Param("id",ParseIntPipe) id:number)
    {
        const data=await this.userService.deleteUser(id);
        return {data};
    }

}
