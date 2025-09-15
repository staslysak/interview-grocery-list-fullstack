import { Controller, Get, Query, SerializeOptions } from '@nestjs/common'

import { UserService } from './user.service'
import { FilterUserDto, UserResposeDto } from './dto/user.dto'
import { Auth } from '@/auth/guards/auth.guard'
import { ApiOkResponse } from '@nestjs/swagger'

@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({ type: [UserResposeDto] })
  @Get()
  @Auth()
  @SerializeOptions({ type: UserResposeDto })
  async getUsers(@Query() filter: FilterUserDto) {
    const data = await this.userService.getUsers(filter)

    return { data }
  }

  @ApiOkResponse({ type: UserResposeDto })
  @Get('self')
  @Auth()
  @SerializeOptions({ type: UserResposeDto })
  async getSelf() {
    const data = await this.userService.getSelf()

    return { data }
  }
}
