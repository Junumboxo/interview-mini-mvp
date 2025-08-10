import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Message {
    @Prop() id: number;
    @Prop({ type: Types.ObjectId, ref: 'Sender', required: true })
    userId: Types.ObjectId;
    @Prop() source: string;
    @Prop() content: string;
    @Prop() language: string;
    @Prop() timestamp: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);