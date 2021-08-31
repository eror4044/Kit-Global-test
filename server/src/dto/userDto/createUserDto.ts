import { IsNotEmpty, Length } from 'class-validator';
export class CreateUserDto{
    @IsNotEmpty()
    readonly email:string
    
    @IsNotEmpty()
    @Length(5,16)
    readonly password:string
}