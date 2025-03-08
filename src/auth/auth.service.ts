import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { TokenResponseDto } from 'list/user/tokenResponse.dto';
import { tokenInterface } from 'list/auth/auth.interface';



@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService
  ) {

  }

  async login(createAuthDto: CreateAuthDto): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOneWithEmail(createAuthDto.email);
    try {
      if (user && await bcrypt.compare(createAuthDto.password, user.password)) {

        const token = await this.createToken({
          id: user.id,
          name: user.name,
          email: user.email,
        })
        return token;
      } else {
        throw new Error('User or password is incorrect');
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }

  }

  async createToken(authInterface: tokenInterface) {
    const plainObj = {
      id: authInterface.id,
      name: authInterface.name,
      email: authInterface.email,
    }
    const token = await this.jwtService.signAsync(plainObj, {secret: process.env.SECRETJWTCODE});
    return {
      id: authInterface.id,
      access_token: token
    };
  }
}
