import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //   async create(createUserDto: CreateUserDto): Promise<User> {
  //   const createdUser = new this.userModel(createUserDto);
  //   return createdUser.save();
  // }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
      return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find();
  }


  async findOne(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  // async update(id: string,user : User): Promise<User> {
  //   return await this.userModel.update({ _id: id },user).exec();
  // }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  async delete(id: string) {
    const deletedUser = await this.userModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedUser;
  }
}

// import { Model } from 'mongoose';
// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User, UserDocument } from './schemas/users.schema';

// @Injectable()
// export class UsersService {

//   constructor (@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const createdUser = new this.userModel(createUserDto);
//     return createdUser.save();
//   }

//   async findAll(): Promise<User[]> {
//     return this.userModel.find().exec();
//   }

//   async findOne(id: string): Promise<User[]> {
//     return this.userModel.find();
//   }

//   async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
//     const updatedUserDto = new this.userModel(updateUserDto);
//     return updatedUserDto.save()
//   }

//   async remove(id: string): Promise<User> {
//     return this.userModel.findOneAndDelete();
// }

// }