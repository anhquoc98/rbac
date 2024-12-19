import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { Permission } from '@/modules/permissions/entities/permision.entity';
import { PermissionsService } from '@/modules/permissions/permissions.service';
import { PermissionsController } from '@/modules/permissions/permissions.controller';
import { User } from '@/modules/users/entities/user.entity';
import { Role } from '@/modules/roles/entities/role.entity';
import { AccessToken } from '@/modules/auth/entities/access-token.entity';
import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersController } from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, AccessToken, RefreshToken,User]),UsersModule, forwardRef(() => AuthModule)],
  controllers: [PermissionsController],
  providers: [PermissionsService, ConfigService],
  exports: [PermissionsService]
})
export class PermissionsModule {}
