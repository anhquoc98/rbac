import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  ForbiddenException
} from '@nestjs/common';
import { Roles } from '@/modules/auth/decorators/role-guard';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';


@Controller('admin')
@UseGuards(RolesGuard)
// permissison create.all, in
export class PermissionsController {
  @Get('dashboard')
  @Roles(1) // Chỉ admin mới có quyền truy cập
  getAdminDashboard() {
    return { message: 'Welcome to Admin Dashboard' };
  }

  @Post('create')
  @Roles(2) // Admin hoặc Manager mới được truy cập
  createSomething(@Body() data: any) {
    return { message: 'Item created successfully', data };
  }
}
