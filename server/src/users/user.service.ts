import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/userDto/createUserDto';
import { User, UserDocument } from 'src/schemass/user.schema';
import * as bcrypt from 'bcrypt';
import { response } from 'express';
import { UpdateUserDto } from 'src/dto/userDto/updateUserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>) {}
  
  async findOneByName(email: string): Promise<User | undefined> {
    return this.userModel.findOne({email: email}).exec()
  }

  async update(userDto: UpdateUserDto): Promise<User | {message}> { 
    if (userDto.password == userDto.repeatPassword) {      
      if (!await this.findOneByName(userDto.email)) {        
        return {message:`user ${userDto.email} does not exist`}
      }
    return await this.userModel.findOneAndUpdate({email:userDto.email},{ $set: {password:await bcrypt.hash(userDto.password,3)
    }},{useFindAndModify: false}).exec().finally(()=>{console.log('User was updated');
    });
    }
    return {message:"wrong password, not equal"}
    
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec()
  }

  async find(user: User): Promise<User | undefined> {
    const pretindent = await this.userModel.findOne(user).exec()
    if (pretindent) {
      return pretindent
    }
    return undefined
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto)
    if (await this.findOneByName(newUser.email)) {
      return{message:`user by email ${newUser.email} already exist`}   
    }
    else{
      newUser.password = (await bcrypt.hash(newUser.password,2))
      return await newUser.save().then(()=>{response.status(201)})
    }
  }

}
