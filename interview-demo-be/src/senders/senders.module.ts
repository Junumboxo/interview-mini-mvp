import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SendersService } from './senders.service';
import { SendersController } from './senders.controller';
import { Sender, SenderSchema } from './schemas/sender.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Sender.name, schema: SenderSchema }]),
    ],
    providers: [SendersService],
    controllers: [SendersController],
    exports: [SendersService],
})
export class SendersModule {}