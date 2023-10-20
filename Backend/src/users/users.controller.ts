import { Body, Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { NoAuth } from 'src/auth/auth.decorator';
import { AddUserDto } from './dtos/add-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @NoAuth()
  @Post()
  async addUser(@Body() dto: AddUserDto) {
  	return await this.usersService.addUser(dto);
  }

  @Get(':userid')
  async getUser(@Param('userid') userId: string) {
    return await this.usersService.getUserById(userId);
  }

  @Patch()
  async updateUser(@Body() dto: UpdateUserDto) {
    return await this.usersService.updateUser(dto);
  }

  @Delete(':userid')
  async removeUser(@Param('userid') userId: string) {
    return await this.usersService.removeUserByUserId(userId);
  }
}
