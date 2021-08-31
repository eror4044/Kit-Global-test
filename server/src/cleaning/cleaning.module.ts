import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cleaning, CleaningSchema } from 'src/schemass/cleaning.schema';
import { CleaningController } from './cleaning.controller';
import { CleaningService } from './cleaning.service';

@Module({
  controllers: [CleaningController],
  providers: [CleaningService],
  imports: [
    MongooseModule.forFeature([{ name: Cleaning.name, schema: CleaningSchema }]),
  ],
})
export class CleaningModule {}
