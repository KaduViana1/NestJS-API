import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

  async getOneUser(userId): Promise<User> {
    const { id } = userId;
    const user = await this.prisma.user.findUnique({ where: { id } });

    delete user.password;
    return user;
  }

  async createUser(createUserDto): Promise<User> {
    const { name, username, email, password } = createUserDto;
    const newUser = await this.prisma.user.create({
      data: { name, username, email, password },
    });

    delete newUser.password;
    return newUser;
  }

  async deleteUser(param): Promise<string> {
    const { id } = param;

    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return 'User not found';
    else {
      await this.prisma.user.delete({ where: { id } });

      return `User with id ${id} successfully deleted`;
    }
  }
}
