import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmployeesModule } from 'src/employees/employees.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    EmployeesModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '600s' },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
