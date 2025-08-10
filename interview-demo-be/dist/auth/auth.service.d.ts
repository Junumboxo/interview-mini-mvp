import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { AppUser } from './schemas/app-user.schema';
export declare class AuthService {
    private readonly appUserModel;
    private readonly jwtService;
    constructor(appUserModel: Model<AppUser>, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<AppUser>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    createUser(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, AppUser, {}, {}> & AppUser & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
