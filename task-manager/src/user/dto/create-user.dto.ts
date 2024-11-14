import { IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsDefined()
  email: string;

  @IsDefined()
  username: string;

  @IsDefined()
  password: string;
}
