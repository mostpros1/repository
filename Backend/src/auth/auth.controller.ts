import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NoAuth } from './auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @NoAuth()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    logIn(@Body() logInDto: { email: string, password: string }): Promise<{access_token: string}> {
        return this.authService.logIn(logInDto.email, logInDto.password)
    }

    @Get('profile')
    getProfile(@Request() request) {
        return request.user;
    }
}
