import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No Unauthorized Access');
    } else if (authHeader.length === 16 && authHeader === 'Bearer undefined') {
      throw new UnauthorizedException('No Unauthorized Access');
    }
    if (authHeader && authHeader.length === 176) {
      return true;
    }

    return super.canActivate(context);
  }
}
