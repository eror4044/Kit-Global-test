import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { CreateUserDto } from 'src/dto/userDto/createUserDto';
import { UpdateUserDto } from 'src/dto/userDto/updateUserDto';
import { Role } from 'src/role.enum';
import { Roles } from 'src/roles.decorator';
import { User } from 'src/schemass/user.schema';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

constructor(private userServise:UserService){}

@Post('registration')
register(@Body() CreateUserDto: CreateUserDto) {
  return this.userServise.create(CreateUserDto)
}

@Put('restorePassword')
update(
  @Body() updateUserDto: UpdateUserDto): Promise<User | {message}> {
    return this.userServise.update(updateUserDto);
} 

@Roles(Role.Admin)
@UseGuards(JwtAuthGuard,RolesGuard)
@Get()
findAll():Promise<User[]>{
  return this.userServise.findAll();
}

}

