import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(createUserDto): Promise<User> {
    const { name, username, email } = createUserDto;
    const password = await argon.hash(createUserDto.password);

    try {
      const newUser = await this.prisma.user.create({
        data: { name, username, email, password },
      });

      delete newUser.password;
      return newUser;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
    }
  }

  async signIn(dto): Promise<User> {
    const { username, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) throw new ForbiddenException('User not found');

    const passwordIsCorrect = await argon.verify(user.password, password);

    if (!passwordIsCorrect) throw new ForbiddenException('Wrong credentials');

    delete user.password;
    return user;
  }

  async signToken(userId: string, email: string): Promise<any> {
    const data = {
      sub: userID,
      email,
    };

    return this.jwt.signAsync();
  }
}
