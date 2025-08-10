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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastMessageDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LastMessageDto {
    userId;
    content;
    timestamp;
}
exports.LastMessageDto = LastMessageDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'abc123' }),
    __metadata("design:type", String)
], LastMessageDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Hello there' }),
    __metadata("design:type", String)
], LastMessageDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-06T12:34:56.000Z' }),
    __metadata("design:type", Date)
], LastMessageDto.prototype, "timestamp", void 0);
//# sourceMappingURL=last-message.dto.js.map