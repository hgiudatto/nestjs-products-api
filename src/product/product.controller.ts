/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Req,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Product Successfully Created', product });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      products,
    });
  }

  @Get('/:prodId')
  async getProduct(@Res() res, @Param('prodId') prodId) {
    const prod = await this.productService.getProduct(prodId);
    if (!prod) throw new NotFoundException('Product Does not exists.');
    return res.status(HttpStatus.OK).json(prod);
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productId') productId) {
    const product = await this.productService.deleteProduct(productId);
    if (!product) throw new NotFoundException('Product Does not exists.');
    return res.status(HttpStatus.OK).json({
      message: 'Product Deleted Succesfully',
      product,
    });
  }

  @Put('/update')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('prodId') prodId,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      prodId,
      createProductDTO,
    );
    if (!updatedProduct)
      throw new NotFoundException('Product Does not exists.');
    return res.status(HttpStatus.OK).json({
      message: 'Product Succesfully updated',
      updatedProduct,
    });
  }
}
