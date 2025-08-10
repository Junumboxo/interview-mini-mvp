export declare class Sender {
    id: string;
    fullName: string;
    language: string;
}
export declare const SenderSchema: import("mongoose").Schema<Sender, import("mongoose").Model<Sender, any, any, any, import("mongoose").Document<unknown, any, Sender, any, {}> & Sender & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Sender, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Sender>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Sender> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
