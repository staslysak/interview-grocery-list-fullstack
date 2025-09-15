import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/shared/prisma/prisma.service'
import { FilterUserDto } from './dto/user.dto'
import { ClsService } from 'nestjs-cls'
import { TAuthContext } from '@/auth/dto/auth.dto'

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cls: ClsService,
  ) {}

  async getUsers(filter: FilterUserDto) {
    const users = await this.prisma.user.findMany({
      where: {
        email: filter.email,
      },
    })

    return users
  }

  async getSelf() {
    const userId = this.cls.get<TAuthContext>('user')?.id

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }
}
