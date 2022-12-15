import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.UserModel(user);
      return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.UserModel.find();
  }


  async findOne(id: string): Promise<User> {
    return this.UserModel.findOne({ _id: id }).exec();
  }

  // async update(id: string, user : User): Promise<User> {
  //   return await this.UserModel.update({ _id: id },user).exec();
  // }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async delete(id: string) {
    const deletedUser = await this.UserModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}
