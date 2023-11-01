import { Module } from '@nestjs/common';
import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { UsersModule } from 'src/modules/users.module';
import { JwtModule } from '@nestjs/jwt';
import 'dotenv/config';
import { EmailModule } from './email.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SESSION_SECRET,
      signOptions: { expiresIn: process.env.JWT_SESSION_EXPIRATION_TIME },
    }),
    EmailModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
