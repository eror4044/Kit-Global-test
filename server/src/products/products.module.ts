/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schemass/product.schema';
import { ProductsController } from './products.controller';
import { ProductService } from './products.setvise';

@Module({
  providers: [ProductService],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
})
export class ProductsModule {}
