import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRensponseDto } from 'list/user/user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<UserRensponseDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserRensponseDto[]> {
    return this.userService.findAll();
  }

  @Get('/get')
  findAllWithAdmins(): Promise<UserRensponseDto[]> {
    return this.userService.findAllWithAdmins();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserRensponseDto> {
    return this.userService.findOne(+id);
  }

  @Patch('restore/:id') 
  restore(@Param('id') id: number) {
    return this.userService.restore(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
