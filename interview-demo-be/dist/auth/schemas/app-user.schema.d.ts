import { Document } from 'mongoose';
export declare class AppUser extends Document {
    email: string;
    passwordHash: string;
}
export declare const AppUserSchema: import("mongoose").Schema<AppUser, import("mongoose").Model<AppUser, any, any, any, Document<unknown, any, AppUser, any, {}> & AppUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AppUser, Document<unknown, {}, import("mongoose").FlatRecord<AppUser>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AppUser> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
