import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { prisma } from 'src/utils/prisma';

@Injectable()
export class UserService {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async getOneUser(userId): Promise<User> {
    const { id } = userId;
    const user = await prisma.user.findUnique({ where: { id } });

    delete user.password;
    return user;
  }

  async createUser(createUserDto): Promise<User> {
    const { name, username, email, password } = createUserDto;
    const newUser = await prisma.user.create({
      data: { name, username, email, password },
    });

    delete newUser.password;
    return newUser;
  }

  async deleteUser(param): Promise<string> {
    const { id } = param;

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) return 'User not found';
    else {
      await prisma.user.delete({ where: { id } });

      return `User with id ${id} successfully deleted`;
    }
  }
}
