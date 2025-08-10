import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    setupTest(): Promise<{
        message: string;
        user: import("mongoose").Document<unknown, {}, import("./schemas/app-user.schema").AppUser, {}, {}> & import("./schemas/app-user.schema").AppUser & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
