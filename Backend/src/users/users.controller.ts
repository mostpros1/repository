import { Body, Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service'; 
import { User } from './users.entity';
import { NoAuth } from 'src/auth/auth.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @NoAuth()
  @Post()
  async addUser(@Body() user: User) {
  	return await this.usersService.addUser(user);
  }

  @Get(':userid')
  async getUser(@Param('userid') userId: string) {
    return await this.usersService.getUserById(userId);
  }

  @Patch()
  async updateUser(@Body() user: User) {
    return await this.usersService.updateUser(user);
  }

  @Delete(':userid')
  async removeUser(@Param('userid') userId: string) {
    return await this.usersService.removeUserByUserId(userId);
  }
}
