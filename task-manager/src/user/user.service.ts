import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../user/model/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { ExistentUserException } from './exceptions/existent-user.exception';
import { UserNotFoundException } from './exceptions/user-not-found.exceptions';
import { UpdateUserDto } from './dto/update-user.dto';
import { Task } from 'src/task/model/task.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Task) private taskModel: typeof Task,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (
      await this.userModel.findOne({ where: { email: createUserDto.email } })
    ) {
      throw new ExistentUserException();
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    return this.userModel.create(createUserDto);
  }

  async findAll() {
    return this.userModel.findAll();
  }

  async findOne(id: string) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: { email: email },
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.userModel.update(
      { ...updateUserDto },
      { where: { id } },
    );

    if (updatedUser) {
      return updatedUser;
    }
  }

  async updatePassword(id: string, passowrd: string) {
    const user = await this.userModel.findOne({ where: { id } });
    if (!user) {
      throw new UserNotFoundException();
    }

    const updatedUser = await this.userModel.update(
      {
        password: passowrd,
        updatedAt: Date.now(),
      },
      { where: { id } },
    );

    if (updatedUser) {
      return updatedUser;
    }
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({ where: { id: id } });
    if (!user) {
      throw new UserNotFoundException();
    }
    const removedUser = await this.userModel.update(
      { deletedAt: Date.now() },
      { where: { id: id } },
    );

    if (removedUser) {
      return removedUser;
    }
  }
}
