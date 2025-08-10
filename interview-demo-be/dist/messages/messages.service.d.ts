import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { LastMessageDto } from './dto/last-message.dto';
export declare class MessagesService {
    private messageModel;
    constructor(messageModel: Model<Message>);
    findAll(): Promise<Message[]>;
    findMessagesByUser(userId: string): Promise<Message[]>;
    getLastMessagesPerUser(): Promise<LastMessageDto[]>;
    save(message: Partial<Message>): Promise<import("mongoose").Document<unknown, {}, Message, {}, {}> & Message & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
