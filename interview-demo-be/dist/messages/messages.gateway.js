"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const messages_service_1 = require("./messages.service");
const senders_service_1 = require("../senders/senders.service");
let MessagesGateway = class MessagesGateway {
    messagesService;
    sendersService;
    server;
    userIds = [];
    constructor(messagesService, sendersService) {
        this.messagesService = messagesService;
        this.sendersService = sendersService;
    }
    afterInit() {
        setInterval(() => {
            const message = this.generateMockMessage();
            this.saveMessage(message);
            this.server.emit('newMessage', message);
        }, 5000);
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
        }
        else {
            userId = `user_${Date.now()}`;
            this.sendersService.save({ id: userId, fullName: "dummyName", language: "en" });
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
    async handleReply(message) {
        await this.saveMessage(message);
    }
    async saveMessage(message) {
        await this.messagesService.save(message);
    }
};
exports.MessagesGateway = MessagesGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessagesGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('replyMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MessagesGateway.prototype, "handleReply", null);
exports.MessagesGateway = MessagesGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [messages_service_1.MessagesService,
        senders_service_1.SendersService])
], MessagesGateway);
//# sourceMappingURL=messages.gateway.js.map