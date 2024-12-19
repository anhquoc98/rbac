import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/modules/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<number[]>('roles', context.getHandler());
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Nếu không yêu cầu role nào, mọi người đều có quyền
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const payload: any = this.jwtService.decode(token);
    console.log(payload);  // Kiểm tra xem payload có chứa roles không
    const user = await this.usersService.findUserById(payload.userId);
    console.log(user);
    const hasRole = user.roles.some(role => requiredRoles.includes(role.id));
    console.log(hasRole);
    if (!user || !user.roles) {
      throw new UnauthorizedException('Invalid token payload');
    }

    // const hasRole = payload.roles.some((role: { id: number }) =>
    //   requiredRoles.includes(role.id)
    // );
    console.log(hasRole);


    if (!hasRole) {
      throw new UnauthorizedException('Access denied');
    }

    return true;
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
