import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/message.schema';
import { Model } from 'mongoose';
import { LastMessageDto } from './dto/last-message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>,
    ) {}

    async findAll(): Promise<Message[]> {
        return this.messageModel.find().sort({ timestamp: 1 }).lean();
    }

    async findMessagesByUser(userId: string): Promise<Message[]> {
        return this.messageModel
            .find({ userId: userId } )
            .sort({ timestamp: 1 })
            .lean();
    }

    async getLastMessagesPerUser(): Promise<LastMessageDto[]> {
        const result = await this.messageModel.aggregate([
            {
                $sort: { timestamp: -1 } // Sort messages newest first
            },
            {
                $group: {
                    _id: '$userId',
                    message: { $first: '$$ROOT' } // Pick first (i.e., newest) message per user
                }
            },
            {
                $replaceRoot: { newRoot: '$message' } // Flatten the result
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    content: 1,
                    timestamp: 1
                }
            }
        ]);
        return result;
    }

    async save(message: Partial<Message>) {
        const newMsg = new this.messageModel(message);
        return newMsg.save();
    }
}
