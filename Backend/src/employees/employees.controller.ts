import { Body, Controller, Get, Post, Delete, Patch, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service'; 
import { Employee } from './entities/employees.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post('add')
  async addEmployee(@Body() employee: Employee) {
  	return await this.employeesService.addEmployee(employee);
  }

  @Get(':userid')
  async getEmployee(@Param('userid') userId: string) {
    return await this.employeesService.getEmployeeByUserId(userId);
  }

  @Patch('update')
  async updateEmployee(@Body() employee: Employee) {
    return await this.employeesService.updateEmployee(employee);
  }

  @Delete('remove/:userid')
  async removeEmployee(@Param('userid') userId: string) {
    return await this.employeesService.removeEmployeeByUserId(userId);
  }
}
