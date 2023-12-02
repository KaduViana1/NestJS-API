import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDto, SignInAndUpdateDto } from 'src/dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUserDto): Promise<{ access_token: string }> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() dto: SignInAndUpdateDto,
  ): Promise<{ access_token: string }> {
    return this.authService.signIn(dto);
  }
}
