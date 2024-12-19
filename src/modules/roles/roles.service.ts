import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '@/modules/roles/entities/role.entity'; // Đảm bảo đường dẫn đúng

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>, // Inject repository của bảng Role
  ) {}

  // 1. Tạo mới một role
  async create(createRoleDto: Partial<Role>): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto); // Tạo một instance của Role
    return await this.roleRepository.save(role); // Lưu vào cơ sở dữ liệu
  }

  // 2. Lấy tất cả các role
  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find(); // Trả về tất cả các role
  }

  //3. Lấy một role theo ID
  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } }); // Sử dụng findOne với điều kiện 'where'

    if (!role) {
      throw new NotFoundException(`Role with id ${id} not found`); // Thêm thông báo lỗi nếu không tìm thấy role
    }

    return role; // Trả về role nếu tìm thấy
  }



  // 4. Cập nhật một role theo ID
  // async update(id: number, updateRoleDto: Partial<Role>): Promise<Role> {
  //   await this.roleRepository.update(id, updateRoleDto); // Cập nhật role
  //   return this.findOne(id); // Trả về role đã được cập nhật
  // }

  // 5. Xóa một role theo ID
  async remove(id: number): Promise<void> {
    await this.roleRepository.delete(id); // Xóa role theo ID
  }
}
