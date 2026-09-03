import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product) 
    private readonly productRepository: Repository<Product>,
  ) {

  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);
      return product;
    } catch (error: any) {
      this.handleDBExceptions(error);
    }
  }

  //TODO: Paginar resultados
  async findAll() {
    try {
      const products = await this.productRepository.find();
      return products;
    }catch (error: any) {
      this.handleDBExceptions(error);
    }
  }
  
  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOne({ where: { id } });
      return product;
    } catch (error: any) {
      this.handleDBExceptions(error);
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: string) {
    try {
      const product = await this.productRepository.delete(id);
      return product;
    } catch (error: any) {
      this.handleDBExceptions(error);
    }
  }


  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    } 
    throw new InternalServerErrorException('Error creating product');
  }
}
