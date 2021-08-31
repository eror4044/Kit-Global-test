import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateCleaningDto } from 'src/dto/cleaningDto/createCleaningDto';
import { Role } from 'src/role.enum';
import { Roles } from 'src/roles.decorator';
import { Cleaning } from 'src/schemass/cleaning.schema';
import { CleaningService } from './cleaning.service';

@Controller('cleaning')
export class CleaningController {
constructor(private cleaningService:CleaningService){}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCleaningDto: CreateCleaningDto): Promise<Cleaning> {
      return this.cleaningService.create(createCleaningDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Cleaning> {
    return this.cleaningService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Cleaning> {
    return this.cleaningService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Body() updateProductDto: CreateCleaningDto,
    @Param('id') id: string,
  ): Promise<Cleaning> {
    return this.cleaningService.update(id, updateProductDto);
  }

}
