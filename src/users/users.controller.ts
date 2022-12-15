import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { create } from 'domain';
import { Inject } from '@nestjs/common/decorators';
import { forwardRef } from '@nestjs/common/utils';

@Controller('users')
export class UsersController {
  constructor(@Inject(forwardRef(() => UsersService)) private  usersService: UsersService) {}

  @Post("create")
  async create(@Body() userData: User): Promise<any> {
    return this.usersService.create(userData);
  }

  @Get("/")
  async findAll(): Promise<any> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // @Patch('update/:id')
  // async update(@Param('id') id: string, @Body() userData: User):Promise<any>  {
  //   return this.usersService.update(id, userData);
  // }

  @Delete('delete/:id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  
}
