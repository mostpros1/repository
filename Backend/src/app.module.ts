import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [EmployeesModule, AuthModule],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
