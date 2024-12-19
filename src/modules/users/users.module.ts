import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccessToken } from '@/modules/auth/entities/access-token.entity';
import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';

import { AuthModule } from '../auth/auth.module';
import { RolesModule } from '../roles/role.module';

import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, AccessToken, RefreshToken]), forwardRef(() => AuthModule)],
  controllers: [UsersController],
  providers: [UsersService, ConfigService],
  exports: [UsersService]
})
export class UsersModule {}
