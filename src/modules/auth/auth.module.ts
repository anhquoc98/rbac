import { forwardRef, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { jwtConfig } from '@/common/config/jwt.config';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';
import { Permission } from '@/modules/permissions/entities/permision.entity';

import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';

import { AccessToken } from './entities/access-token.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/bcrypt.service';
import { TokenService } from './services/token.service';
import { AuthController } from './auth.controller';
import { RolesGuard } from '@/modules/auth/guards/roles.guard';
import { RolesModule } from '@/modules/roles/role.module';

@Module({
  imports: [
    JwtModule.registerAsync(jwtConfig),
    TypeOrmModule.forFeature([AccessToken, RefreshToken, User, Role, Permission]),

    forwardRef(() => UsersModule,),
    RolesModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenService, BcryptService, ConfigService,RolesGuard],
  exports: [AuthService,JwtModule, RolesGuard] // Xuất khẩu để dùng trong module khác
})
export class AuthModule {}
