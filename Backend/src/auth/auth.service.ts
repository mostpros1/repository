import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async createToken(userId: string, userName: string): Promise<{access_token: string}> {
        const payload = { sub: userId, username: userName };
        return { access_token: await this.jwtService.signAsync(payload) };
    }

    async logIn(email: string, password: string): Promise<{access_token: string}> {
        const user = (await this.usersService.getUserByEmail(email)).Items[0];
        if (!await bcrypt.compare(password, user.password.S)) throw new UnauthorizedException();
        return this.createToken(user.userId.S, `${user.firstName.S} ${user.lastName.S}`);
    }

    async signUp(user: User) {
        await this.usersService.addUser(user);
        return this.createToken(user.userId, `${user.firstName} ${user.lastName}`);
    }
}
