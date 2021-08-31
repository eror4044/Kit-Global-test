import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schemass/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  exports: [UserService],
  controllers:[UserController],
})
export class UserModule {}
