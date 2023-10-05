import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmployeesService } from 'src/employees/employees.service';

@Injectable()
export class AuthService {
    constructor(
        private employeesService: EmployeesService,
        private jwtService: JwtService
    ) {}

    async logIn(email: string, password: string): Promise<{access_token: string}> {
        const user = (await this.employeesService.getEmployeeByEmail(email)).Items[0];
        if (user.password.S !== password) throw new UnauthorizedException();
        const payload = { sub: user.userId.S, username: `${user.firstName.S} ${user.lastName.S}` };
        return { access_token: await this.jwtService.signAsync(payload) };
    }
}
