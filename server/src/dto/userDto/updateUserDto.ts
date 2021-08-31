import { IsNotEmpty, Length } from 'class-validator';
export class UpdateUserDto{
    @IsNotEmpty()
    readonly email:string
    
    @IsNotEmpty()
    @Length(5,16)
    readonly password:string

    @IsNotEmpty()
    @Length(5,16)
    readonly repeatPassword:string
}