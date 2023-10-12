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
    signUp(@Body() user: User) {
        return this.authService.signUp(user);
    }

    @Get('profile')
    getProfile(@Request() request) {
        return request.user;
    }
}
