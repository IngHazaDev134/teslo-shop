import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly JwtService: JwtService
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });
      await this.userRepository.save(user);
      // delete user.password;

      return {
        ...user,
        token: this.getJwtToken({email: user.email})
      };
    } catch (error: any) {
      this.handelDBErros(error);
    }
  }


  async loginUser(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true }
    });

    if (!user)
      throw new UnauthorizedException(`Credentials are not Valid`);

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException(`Credentials are not valid`);

    return {
      ...user,
      token: this.getJwtToken({email: user.email})
    };
    // TODO: Rertornar el JWT
  }


  private getJwtToken(payload: JwtPayload){
    //* Generacion de Token
    const token = this.JwtService.sign(payload);
    return token;
  }



  private handelDBErros(error: any): never {
    if (error.code === "23505")
      throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }

}
