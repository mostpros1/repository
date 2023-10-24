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
import { LogInDto } from './dtos/login.dto';
import { SignUpDto } from './dtos/signup.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @NoAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    logIn(@Body() dto: LogInDto): Promise<{access_token: string}> {
        return this.authService.logIn(dto.email, dto.password);
    }

    @NoAuth()
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
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
    createPasswordReset(@Body() email: string) {
        return this.authService.createPasswordResetCode(email);
    }
    
    @NoAuth()
    @Get('reset-password/:resetcode')
    resetPassword(@Param('resetcode') resetCode: string, @Body() password: string) {
        return this.authService.resetPassword(resetCode, password);
    }
}
