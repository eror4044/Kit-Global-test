import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { response } from 'express';
import { Model } from 'mongoose';
import { CreateCleaningDto } from 'src/dto/cleaningDto/createCleaningDto';
import { Cleaning, CleaningDocument } from 'src/schemass/cleaning.schema';

@Injectable()
export class CleaningService {
    constructor(@InjectModel(Cleaning.name) private cleaningModel: Model<CleaningDocument>){}

    create(createCleaningDto: CreateCleaningDto): Promise<Cleaning> {
        const newCleaning = new this.cleaningModel(createCleaningDto);
        return newCleaning.save();
    }

    async getAll(): Promise<Cleaning[]> {
    return this.cleaningModel.find().exec();
    }

    async getById(id: string): Promise<Cleaning> {
    return this.cleaningModel.findById(id);
    }

    async remove(id: string): Promise<Cleaning> {
    return this.cleaningModel.findByIdAndRemove(id);
    }
  
    async update(id, createCleaningDto: CreateCleaningDto): Promise<Cleaning> {
    return this.cleaningModel.findOneAndUpdate(id, createCleaningDto, { new: true });
    }
}
