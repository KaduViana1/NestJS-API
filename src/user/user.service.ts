import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async updateUser(userId, dto) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });

    delete user.password;
    return user;
  }

  async deleteUser(id): Promise<string> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) return 'User not found';
    else {
      await this.prisma.user.delete({ where: { id } });

      return `User with id ${id} successfully deleted`;
    }
  }
}
