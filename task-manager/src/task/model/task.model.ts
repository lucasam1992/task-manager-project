import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../user/model/user.model';
import { UserTask } from './userTask.model';

@Table
export class Task extends Model<Task> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.ENUM('Backlog', 'To Do', 'In Progress', 'Done'),
    defaultValue: 'Backlog',
  })
  status: string;

  @BelongsToMany(() => User, () => UserTask)
  assignedUsers: User[];
}
