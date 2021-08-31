import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateProductDto } from 'src/dto/productDto/update-product.dto';
import { Product } from 'src/schemass/product.schema';
import { CreateProductDto } from '../dto/productDto/create-product.dto';
import { ProductService } from './products.setvise';
@Controller('products')
export class ProductsController {
  // @Get()
  // getAll(@Req() Req,@Res() Res, @Next() Next){
  //     return 'getAll'
  // }
  constructor(private productServie: ProductService) {}
  @Get()
  getAll(): Promise<Product[]> {
    console.log('getProduct done')
    return this.productServie.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productServie.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productServie.create(createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productServie.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productServie.update(id, updateProductDto);
  }
}
