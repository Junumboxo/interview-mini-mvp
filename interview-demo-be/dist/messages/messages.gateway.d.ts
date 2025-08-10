import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { SendersService } from '../senders/senders.service';
export declare class MessagesGateway implements OnGatewayInit {
    private messagesService;
    private sendersService;
    server: Server;
    private userIds;
    constructor(messagesService: MessagesService, sendersService: SendersService);
    afterInit(): void;
    generateMockMessage(): {
        id: number;
        userId: any;
        source: string;
        content: string;
        language: string;
        timestamp: Date;
    };
    handleReply(message: any): Promise<void>;
    saveMessage(message: any): Promise<void>;
}
