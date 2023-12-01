import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/user.dto';
import { User } from '@prisma/client';
import { UserService } from './user.service';

import { JwtGuard } from 'src/auth/guard/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getUser() {
    return 'String';
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param() param: { id: string }): Promise<any> {
    return this.userService.deleteUser(param);
  }
}
