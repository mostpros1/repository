import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoAuth } from './auth.decorator';
import { User } from 'src/users/users.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @NoAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    logIn(@Body() logInDto: { email: string, password: string }): Promise<{access_token: string}> {
        return this.authService.logIn(logInDto.email, logInDto.password);
    }

    @NoAuth()
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() signUpDto: User) {
        return this.authService.signUp(signUpDto);
    }

    @NoAuth()
    @Get('verify-email')
    verifyEmail(@Query('code') code: string) {
        if (!code) throw new BadRequestException();
        return this.authService.verifyEmail(code);
    }

    // There should be a page with a form so the user can POST to /auth/reset-password with their email in the body

    @NoAuth()
    @Post('reset-password')
    createPasswordReset(@Body() createPassResetDto: { email: string }) {
        return this.authService.createPasswordResetCode(createPassResetDto.email);
    }
    
    @NoAuth()
    @Get('reset-password/:resetcode')
    resetPassword(@Param('resetcode') resetCode: string, @Body() resetPassDto: { password: string }) {
        return this.authService.resetPassword(resetCode, resetPassDto.password);
    }
}
