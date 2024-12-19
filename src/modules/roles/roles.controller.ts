import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity'; // Đảm bảo đường dẫn đúng

@Controller('roles') // Đường dẫn cho các action
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // 1. Tạo mới một role
  @Post()
  async create(@Body() createRoleDto: Partial<Role>): Promise<Role> {
    return this.rolesService.create(createRoleDto); // Gọi phương thức create trong RolesService
  }

  // 2. Lấy tất cả các role
  @Get()
  async findAll(): Promise<Role[]> {
    return this.rolesService.findAll(); // Gọi phương thức findAll trong RolesService
  }

  // // 3. Lấy một role theo ID
  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<Role> {
  //   return this.rolesService.findOne(id); // Gọi phương thức findOne trong RolesService
  // }
  //
  // // 4. Cập nhật một role theo ID
  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() updateRoleDto: Partial<Role>,
  // ): Promise<Role> {
  //   return this.rolesService.update(id, updateRoleDto); // Gọi phương thức update trong RolesService
  // }

  // 5. Xóa một role theo ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.rolesService.remove(id); // Gọi phương thức remove trong RolesService
  }
}
