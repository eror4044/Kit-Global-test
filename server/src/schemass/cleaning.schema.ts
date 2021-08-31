import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Document} from "mongoose"
import { CleaningServise } from "src/cleaning-servise";
export type CleaningDocument = Cleaning & Document;


@Schema()
export class Cleaning{
    @Prop()
    readonly name:string
        
    @Prop()
    readonly description:string
    
    @Prop()
    readonly servicesProvided:CleaningServise[]
    
    @Prop()
    readonly image:string
}

export const CleaningSchema = SchemaFactory.createForClass(Cleaning);