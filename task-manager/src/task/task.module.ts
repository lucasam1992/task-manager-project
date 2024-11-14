// tasks/tasks.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from '../task/model/task.model';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { User } from 'src/user/model/user.model';
import { UserTask } from './model/userTask.model';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [SequelizeModule.forFeature([User, Task, UserTask])],
  providers: [TaskService, UserService],
  controllers: [TaskController],
})
export class TaskModule {}
