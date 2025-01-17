import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @UseGuards(GoogleAuthGuard)
  @Get("google/login")
  async googleLogin() {

  }

  @UseGuards(GoogleAuthGuard)
  @Get("google/callback")
  async googleCallback(@Req() req, @Res() res) {
    const user = await this.authService.validateGoogleUser(req.user);
    res.redirect('/api')
  }

}
