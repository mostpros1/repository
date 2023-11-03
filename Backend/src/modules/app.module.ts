import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthModule } from './auth.module';
import { AuthGuard } from '../guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PaymentsModule } from './payments.module';

@Module({
  imports: [UsersModule, AuthModule, PaymentsModule],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
