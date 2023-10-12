import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SESSION_SECRET,
      signOptions: { expiresIn: process.env.JWT_SESSION_EXPIRATION_TIME },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
