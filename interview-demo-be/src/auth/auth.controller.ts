import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        return this.authService.login(body.email, body.password);
    }

    @Get('setup-test')
    async setupTest() {
        const user = await this.authService.createUser('test@test.com', 'password123');
        return { message: 'Test user created', user };
    }
}
