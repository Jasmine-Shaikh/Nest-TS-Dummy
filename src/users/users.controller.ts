import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post("create")
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string):Promise<User> {
    return this.usersService.findOne(id);
  }

  
  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
  
  // @Patch('update/:id')
  // async update(@Param('id') id: string, @Body() userData: User):Promise<any>  {
  //   return this.usersService.update(id, userData);
  // }
  
}
