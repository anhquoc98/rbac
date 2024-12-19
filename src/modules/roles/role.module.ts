import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { User } from '@/modules/users/entities/user.entity';
import { AccessToken } from '@/modules/auth/entities/access-token.entity';
import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersController } from '@/modules/users/users.controller';
import { UsersService } from '@/modules/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role,User]),forwardRef(()=> AuthModule)],
  controllers: [RolesController],
  providers: [RolesService, ConfigService],
  exports: [RolesService]
})
export class RolesModule {}


