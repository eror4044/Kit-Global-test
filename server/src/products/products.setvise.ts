import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/dto/productDto/create-product.dto';
import { UpdateProductDto } from 'src/dto/productDto/update-product.dto';
import { Product, ProductDocument } from 'src/schemass/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }
  async create(productDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(productDto);
    return newProduct.save();
  }
  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
  async update(id, productDto: UpdateProductDto): Promise<Product> {
    return this.productModel.findOneAndUpdate(id, productDto, { new: true });
  }
}
