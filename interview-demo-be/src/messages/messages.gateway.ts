import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit, SubscribeMessage, MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessagesService } from './messages.service';
import { SendersService } from '../senders/senders.service';

@WebSocketGateway({ cors: true })
export class MessagesGateway implements OnGatewayInit {
    @WebSocketServer()
    server: Server;
    private userIds: string[] = [];

    constructor(private messagesService: MessagesService,
                private sendersService: SendersService) {}

    afterInit() {
        setInterval(() => {
            const message = this.generateMockMessage();
            this.saveMessage(message);
            this.server.emit('newMessage', message);
        }, 5000); // every 5s
    }

    generateMockMessage() {
        const sources = ['WhatsApp', 'Booking.com', 'Email'];
        const contents = [
            'Hola, ¿tienes habitaciones?',
            'Ich möchte stornieren',
            'Do you allow pets?',
        ];
        const languages = ['es', 'de', 'en'];
        const index = Math.floor(Math.random() * sources.length);

        let userId;
        if (this.userIds.length > 0 && Math.random() < 0.5) {
            userId = this.userIds[Math.floor(Math.random() * this.userIds.length)];
        } else {
            userId = `user_${Date.now()}`;
            this.sendersService.save({id: userId, fullName: "dummyName", language: "en"});
            this.userIds.push(userId);
        }

        return {
            id: Date.now(),
            userId,
            source: sources[index],
            content: contents[index],
            language: languages[index],
            timestamp: new Date(),
        };
    }

    @SubscribeMessage('replyMessage')
    async handleReply(@MessageBody() message: any) {
        await this.saveMessage(message);
    }

    async saveMessage(message: any) {
        await this.messagesService.save(message);
    }
}