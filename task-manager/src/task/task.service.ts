import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from '../task/model/task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserNotFoundException } from 'src/user/exceptions/user-not-found.exceptions';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task) private taskModel: typeof Task,
    @InjectModel(User) private userModel: typeof Task,
    private userService: UserService,
  ) {}

  async create(createTaskDto: CreateTaskDto, email: string) {
    const user = await this.userService.findByEmail(email);
    const task = await this.taskModel.create(createTaskDto);

    if (user) {
      await user.$add('tasks', task);
    }

    return task;
  }

  async findOne(id: string) {
    const task = await this.taskModel.findOne({ where: { id } });
    if (!task) {
      throw new UserNotFoundException();
    }
    return task;
  }

  async findAll() {
    return this.taskModel.findAll();
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel.findOne({ where: { id } });
    if (!task) {
      throw new UserNotFoundException();
    }

    const updatedUser = await this.taskModel.update(
      { ...updateTaskDto },
      { where: { id } },
    );

    if (updatedUser) {
      return updatedUser;
    }
  }

  async remove(id: string) {
    const task = await this.taskModel.findOne({ where: { id: id } });
    if (!task) {
      throw new UserNotFoundException();
    }
    const removedTask = await this.taskModel.update(
      { deletedAt: Date.now() },
      { where: { id: id } },
    );

    if (removedTask) {
      return removedTask;
    }
  }
}
