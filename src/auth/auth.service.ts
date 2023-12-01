import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signUp(createUserDto): Promise<{ access_token: string }> {
    const { name, username, email } = createUserDto;
    const password = await argon.hash(createUserDto.password);

    try {
      const user = await this.prisma.user.create({
        data: { name, username, email, password },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
        throw error;
      }
    }
  }

  async signIn(dto): Promise<{ access_token: string }> {
    const { username, password } = dto;

    const user = await this.prisma.user.findUnique({ where: { username } });

    if (!user) throw new ForbiddenException('User not found');

    const passwordIsCorrect = await argon.verify(user.password, password);

    if (!passwordIsCorrect) throw new ForbiddenException('Wrong credentials');

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });

    return { access_token: token };
  }
}
