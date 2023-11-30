import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto, SignInDto } from 'src/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUserDto): Promise<CreateUserDto> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  async signIn(@Body() dto: SignInDto): Promise<CreateUserDto> {
    return this.authService.signIn(dto);
  }
}
