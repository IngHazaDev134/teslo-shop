import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

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

 
  async findAll(paginationDto: PaginationDto) {
    const { limit = 2, offset = 1 } = paginationDto;
    try {
      const products = await this.productRepository.find({
        take: limit,
        skip: offset
        // TODO: relacionar las tablas de productos con las imagenes
      });
      return products;
    }catch (error: any) {
      this.handleDBExceptions(error);
    }
  }
  
  async findOne(term: string) {

    let product: Product | null;

    if(isUUID(term)) {
      product = await this.productRepository.findOneBy({ id: term });
    } else {
      product = await this.productRepository.findOneBy({ slug: term });
    }

    if(!product) {
      throw new BadRequestException(`Product with id or slug "${term}" not found`);
    }   

    return product;
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
