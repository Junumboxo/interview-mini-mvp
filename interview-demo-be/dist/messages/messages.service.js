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
exports.MessagesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const message_schema_1 = require("./schemas/message.schema");
const mongoose_2 = require("mongoose");
let MessagesService = class MessagesService {
    messageModel;
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    async findAll() {
        return this.messageModel.find().sort({ timestamp: 1 }).lean();
    }
    async findMessagesByUser(userId) {
        return this.messageModel
            .find({ userId: userId })
            .sort({ timestamp: 1 })
            .lean();
    }
    async getLastMessagesPerUser() {
        const result = await this.messageModel.aggregate([
            {
                $sort: { timestamp: -1 }
            },
            {
                $group: {
                    _id: '$userId',
                    message: { $first: '$$ROOT' }
                }
            },
            {
                $replaceRoot: { newRoot: '$message' }
            },
            {
                $project: {
                    _id: 0,
                    userId: 1,
                    content: 1,
                    timestamp: 1
                }
            }
        ]);
        return result;
    }
    async save(message) {
        const newMsg = new this.messageModel(message);
        return newMsg.save();
    }
};
exports.MessagesService = MessagesService;
exports.MessagesService = MessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(message_schema_1.Message.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MessagesService);
//# sourceMappingURL=messages.service.js.map