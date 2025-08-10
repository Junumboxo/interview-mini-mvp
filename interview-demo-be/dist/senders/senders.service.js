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
exports.SendersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const sender_schema_1 = require("./schemas/sender.schema");
let SendersService = class SendersService {
    senderModel;
    constructor(senderModel) {
        this.senderModel = senderModel;
    }
    async findAll() {
        return this.senderModel.find().sort({ timestamp: 1 }).lean();
    }
    async save(sender) {
        const newSender = new this.senderModel(sender);
        return newSender.save();
    }
};
exports.SendersService = SendersService;
exports.SendersService = SendersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(sender_schema_1.Sender.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SendersService);
//# sourceMappingURL=senders.service.js.map