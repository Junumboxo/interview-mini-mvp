import { MessagesService } from './messages.service';
import { Message } from './schemas/message.schema';
import { LastMessageDto } from './dto/last-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    getAllMessages(): Promise<Message[]>;
    getLastMessagesPerUser(): Promise<LastMessageDto[]>;
    getAllMessagesForUser(userId: string): Promise<Message[]>;
}
