import { Model } from 'mongoose';
import { Sender } from './schemas/sender.schema';
export declare class SendersService {
    private senderModel;
    constructor(senderModel: Model<Sender>);
    findAll(): Promise<Sender[]>;
    save(sender: Partial<Sender>): Promise<import("mongoose").Document<unknown, {}, Sender, {}, {}> & Sender & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
