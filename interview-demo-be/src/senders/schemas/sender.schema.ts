import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Sender {
    @Prop() id: string;
    @Prop() fullName: string;
    @Prop() language: string;
}

export const SenderSchema = SchemaFactory.createForClass(Sender);