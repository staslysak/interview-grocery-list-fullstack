import { Body, Controller, Delete, Get, Param, Post, Put, Query, SerializeOptions } from '@nestjs/common'
import { GroceryService } from './grocery.service'
import {
  CreateGroceryDto,
  DeleteGroceryBulkDto,
  GroceryResposeDto,
  PaginatedGroceryDto,
  UpdateGroceryDto,
  FilterGroceryDto,
  UpdateGroceryStatusDto,
  FilterGroceryHistoryDto,
  PaginatedGroceryHistoryDto,
} from './dto/grocery.dto'
import { Auth } from '@/auth/guards/auth.guard'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { IdDto, IdResposeDto } from '@/shared/dto/id.dto'

@ApiTags('grocery')
@Controller({
  version: '1',
  path: 'grocery',
})
export class GroceryController {
  constructor(private readonly groceryService: GroceryService) {}

  @ApiOkResponse({ type: PaginatedGroceryDto })
  @Get()
  @Auth()
  @SerializeOptions({ type: PaginatedGroceryDto })
  async filterGroceries(@Query() filter: FilterGroceryDto) {
    const data = await this.groceryService.filterGroceries(filter)

    return data
  }

  @ApiOkResponse({ type: GroceryResposeDto })
  @Get(':id')
  @Auth()
  @SerializeOptions({ type: GroceryResposeDto })
  async findGroceryItem(@Param() { id }: IdDto) {
    const data = await this.groceryService.findGroceryItem(id)

    return { data }
  }

  @ApiOkResponse({ type: PaginatedGroceryHistoryDto })
  @Get(':id/history')
  @Auth()
  @SerializeOptions({ type: PaginatedGroceryHistoryDto })
  async findGroceryItemHistory(@Param() { id }: IdDto, @Query() filter: FilterGroceryHistoryDto) {
    const data = await this.groceryService.findGroceryItemHistory(id, filter)

    return data
  }

  @ApiOkResponse({ type: IdResposeDto })
  @Post()
  @Auth()
  @SerializeOptions({ type: IdResposeDto })
  async createGrocery(@Body() input: CreateGroceryDto) {
    const data = await this.groceryService.createGrocery(input)

    return { data }
  }

  @ApiOkResponse({ type: IdResposeDto })
  @Put(':id')
  @Auth()
  @SerializeOptions({ type: IdResposeDto })
  async updateGrocery(@Param() { id }: IdDto, @Body() input: UpdateGroceryDto) {
    const data = await this.groceryService.updateGrocery(id, input)

    return { data }
  }

  @ApiOkResponse({ type: IdResposeDto })
  @Put(':id/status')
  @Auth()
  @SerializeOptions({ type: IdResposeDto })
  async updateGroceryStatus(@Param() { id }: IdDto, @Body() input: UpdateGroceryStatusDto) {
    const data = await this.groceryService.updateGroceryStatus(id, input)

    return { data }
  }

  @ApiOkResponse({})
  @Delete('bulk')
  @Auth()
  async deleteGroceryBulk(@Body() input: DeleteGroceryBulkDto) {
    await this.groceryService.deleteGroceryBulk(input)
  }

  @ApiOkResponse({ type: IdResposeDto })
  @Delete(':id')
  @Auth()
  @SerializeOptions({ type: IdResposeDto })
  async deleteGrocery(@Param() { id }: IdDto) {
    const data = await this.groceryService.deleteGrocery(id)

    return { data }
  }
}
