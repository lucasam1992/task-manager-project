import { IsDefined } from 'class-validator';

export class CreateTaskDto {
  @IsDefined()
  title: string;

  @IsDefined()
  description: string;

  @IsDefined()
  status: string;
}
