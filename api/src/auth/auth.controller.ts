import { Body, Controller, Post, SerializeOptions, UseGuards } from '@nestjs/common'

import { JwtRefreshGuard } from '@/auth/modules/jwt/jwt.guard'
import { AuthService } from '@/auth/auth.service'

import { LoginDto, RefreshTokenDto, TokensResposeDto } from './dto/auth.dto'
import { ApiOkResponse } from '@nestjs/swagger'

@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({ type: TokensResposeDto })
  @Post('login')
  @SerializeOptions({ type: TokensResposeDto })
  async login(@Body() input: LoginDto) {
    const data = await this.authService.login(input)

    return { data }
  }

  @ApiOkResponse({ type: TokensResposeDto })
  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @SerializeOptions({ type: TokensResposeDto })
  async refreshToken(@Body() input: RefreshTokenDto) {
    const data = await this.authService.refreshToken(input)

    return { data }
  }
}
