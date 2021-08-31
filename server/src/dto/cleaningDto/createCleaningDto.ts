import { IsNotEmpty, Length } from 'class-validator';
import { CleaningServise } from 'src/cleaning-servise';
export class CreateCleaningDto{
    @IsNotEmpty()
    readonly name:string
    
    @IsNotEmpty()
    readonly description:string

    @IsNotEmpty()
    readonly servicesProvided:CleaningServise[]

    @IsNotEmpty()
    readonly image:string
}