import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/users/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,userService:UserService) {}

  canActivate(context: ExecutionContext): boolean{
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log(request);
    
    return true
  }
}


