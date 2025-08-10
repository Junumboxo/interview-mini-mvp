import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { SendersModule } from '../senders/senders.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
        SendersModule,
    ],
    providers: [MessagesGateway, MessagesService],
    controllers: [MessagesController],
})
export class MessagesModule {}