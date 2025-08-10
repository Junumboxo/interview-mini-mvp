"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const senders_service_1 = require("./senders.service");
const senders_controller_1 = require("./senders.controller");
const sender_schema_1 = require("./schemas/sender.schema");
let SendersModule = class SendersModule {
};
exports.SendersModule = SendersModule;
exports.SendersModule = SendersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: sender_schema_1.Sender.name, schema: sender_schema_1.SenderSchema }]),
        ],
        providers: [senders_service_1.SendersService],
        controllers: [senders_controller_1.SendersController],
        exports: [senders_service_1.SendersService],
    })
], SendersModule);
//# sourceMappingURL=senders.module.js.map