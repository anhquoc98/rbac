import { SetMetadata } from '@nestjs/common';

// roles là mảng các ID role mà endpoint yêu cầu
export const Roles = (...roles: number[]) => SetMetadata('roles', roles);