import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = await this.userModel.create(createUserDto);
    return createdUser;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }


  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
    .findByIdAndRemove({ _id: id })
    .exec();
    return deletedUser;
  }

  // async update(id: string, user : User): Promise<User> {
  //   return await this.userModel.update({ _id: id },user).exec();
  // }
}
