import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AppUser } from './schemas/app-user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(AppUser.name) private readonly appUserModel: Model<AppUser>,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<AppUser> {
        const user = await this.appUserModel.findOne({ email }).exec();
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) throw new UnauthorizedException('Invalid credentials');

        return user;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        const payload = { sub: user._id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { token };
    }

    async createUser(email: string, password: string) {
        const passwordHash = await bcrypt.hash(password, 10);
        return this.appUserModel.create({ email, passwordHash });
    }
}
