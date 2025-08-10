import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sender } from './schemas/sender.schema';

@Injectable()
export class SendersService {
    constructor(
        @InjectModel(Sender.name) private senderModel: Model<Sender>,
    ) {}

    async findAll(): Promise<Sender[]> {
        return this.senderModel.find().sort({ timestamp: 1 }).lean();
    }

    async save(sender: Partial<Sender>) {
        const newSender = new this.senderModel(sender);
        return newSender.save();
    }
}
