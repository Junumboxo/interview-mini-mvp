import { Controller, Get, Param, UseGuards} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Message } from './schemas/message.schema';
import { LastMessageDto } from './dto/last-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllMessages(): Promise<Message[]> {
        return this.messagesService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/last')
    async getLastMessagesPerUser(): Promise<LastMessageDto[]> {
        return this.messagesService.getLastMessagesPerUser();
    }

    @UseGuards(JwtAuthGuard)
    @Get(':userId')
    async getAllMessagesForUser(@Param('userId') userId: string): Promise<Message[]> {
        return this.messagesService.findMessagesByUser(userId);
    }
}
