import { HttpException, HttpStatus } from '@nestjs/common';

export class ExistentUserException extends HttpException {
  constructor() {
    super('There is the same email', HttpStatus.BAD_REQUEST);
  }
}
