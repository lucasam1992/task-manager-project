import { IsNotEmpty } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty({
    message: 'The email field cannot be empty',
  })
  email: string;
  @IsNotEmpty({
    message: 'The password field cannot be empty',
  })
  password: string;
}
