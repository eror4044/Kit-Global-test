import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/schemass/user.schema';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { from } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByName(login);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }



  async login(user: any) {
    const payload = { email: user.email, sub: user.Id };
    const pretindent = await this.usersService.findOneByName(user.email)    
      if (pretindent && await bcrypt.compare(user.password,pretindent.password)) {
        return {access_token:this.jwtService.sign(payload)}
      }
      return{message:'wrong login or password'}
    }
}
