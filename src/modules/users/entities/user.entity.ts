import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, Unique } from 'typeorm';

import { RefreshToken } from '@/modules/auth/entities/refresh-token.entity';

import { AbstractEntityWithUUID } from '../../../common/abstracts/entity.abstract';
import { Role } from '@/modules/roles/entities/role.entity';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends AbstractEntityWithUUID {
  @ApiProperty({ description: 'Email of user', example: 'example@gmail.com' })
  @Column()
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ description: 'Full name of user', example: 'John' })
  @Column({ name: 'full_name' })
  fullName: string;

  @ApiProperty({ description: 'Phone of user', example: '0123456789' })
  @Column()
  phone: string;

  @ApiProperty({ description: 'Gender of user', example: 1 })
  @Column()
  gender: number;

  @ApiProperty({ description: 'Address of user', example: '123 Hoang Dieu' })
  @Column()
  address: string;

  @ApiProperty({ description: 'Avatar of user', example: 'https://example.com/avatar.jpg' })
  @Column({
    nullable: true
  })
  avatar: string;

  @ApiProperty({ description: 'Status of user', example: 1 })
  @Column()
  status: number;

  @ApiHideProperty()
  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  refreshTokens!: RefreshToken[];

  @ManyToMany(() => Role)
  @JoinTable() // Specifies the join table name
  roles: Role[];
}
