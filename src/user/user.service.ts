import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { UserRensponseDto } from 'list/user/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { TokenResponseDto } from 'list/user/tokenResponse.dto';


@Injectable()
export class UserService {


  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {

  }

  async create(createUserDto: CreateUserDto): Promise<TokenResponseDto> {
    const created = await this.userRepository.create(createUserDto);
    try {
      if(!created) {
        throw new Error('Try Register Again');
      }
      
      const token = await this.authService.createToken({
        id: created.id,
        name: created.name,
        email: created.email
      })

      return token;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<UserRensponseDto[]> {
    return this.userRepository.findAll();
  }

  async findAllWithAdmins(): Promise<UserRensponseDto[]> {
    return await this.userRepository.findAllWithAdmins();
  }

  async findOne(id: number): Promise<UserRensponseDto> {
    const user = await this.userRepository.findOne(id);
    try {
      if(!user) {

      }
      return user;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }

  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.update(id, updateUserDto);
    try {
      if(user.affected == 0) {
        throw new Error('User id not found');
      }
      return user;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async restore(id: number) {
    const user = await this.userRepository.restore(id);
    try {
      if(user.affected == 0) {
        throw new Error('User id not found');
      }
      return user;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    const user = await this.userRepository.remove(id);
    try {
      if(user.affected == 0) {
        throw new Error('User id not found');
      }
      return user;
    } catch(err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  
}
