import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { Task } from './task.model';

@Table
export class UserTask extends Model<UserTask> {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Task)
  @Column
  taskId: number;
}
