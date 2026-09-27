import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const {password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      // delete user.password;

      return userData;
    } catch (error: any) {
      this.handelDBErros(error);
    }
  }


  async loginUser(loginUserDto: LoginUserDto){
    try {
      const { password, email } = loginUserDto;
      const user = await this.userRepository.findOneBy({email});
      return user;
    } catch (error: any) {
      this.handelDBErros(error)
    }
  }

  private handelDBErros(error: any): never {
    if(error.code === "23505")
      throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }

}
