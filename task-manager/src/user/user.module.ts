// users/users.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../user/model/user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Task } from 'src/task/model/task.model';
import { UserTask } from 'src/task/model/userTask.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Task, UserTask])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService, SequelizeModule],
})
export class UserModule {}
