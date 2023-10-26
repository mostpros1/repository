import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    Res
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { NoAuth } from '../decorators/auth.decorator';
import { LogInDto } from '../dtos/auth/login.dto';
import { SignUpDto } from '../dtos/auth/signup.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @NoAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logIn(@Body() dto: LogInDto, @Res() response: Response) {
        const token = await this.authService.logIn(dto.email, dto.password);
        response.cookie('jwtToken', token, { httpOnly: true, maxAge: Number(process.env.JWT_SESSION_EXPIRATION_TIME) });
        response.send({ message: 'Login succesful' });
    }

    @NoAuth()
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    async signUp(@Body() dto: SignUpDto) {
        return this.authService.signUp(dto);
    }

    @NoAuth()
    @Get('verify-email')
    async verifyEmail(@Query('code') code: string) {
        if (!code) throw new BadRequestException();
        return this.authService.verifyEmail(code);
    }

    // There should be a page with a form so the user can POST to /auth/reset-password with their email in the body

    @NoAuth()
    @Post('reset-password')
    async createPasswordReset(@Body() email: string) {
        return this.authService.createPasswordResetCode(email);
    }
    
    @NoAuth()
    @Get('reset-password/:resetcode')
    async resetPassword(@Param('resetcode') resetCode: string, @Body() password: string) {
        return this.authService.resetPassword(resetCode, password);
    }
}
