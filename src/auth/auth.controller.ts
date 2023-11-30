import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUserDto): Promise<any> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  async signIn(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return dto;
  }
}
