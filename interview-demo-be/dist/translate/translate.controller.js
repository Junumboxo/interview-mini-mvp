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
exports.TranslateController = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let TranslateController = class TranslateController {
    httpService;
    configService;
    constructor(httpService, configService) {
        this.httpService = httpService;
        this.configService = configService;
    }
    async translate(body) {
        const { q, source, target } = body;
        const apiKey = this.configService.get('LIBRETRANSLATE_API_KEY');
        const payload = {
            q,
            source,
            target,
            format: 'text',
            api_key: apiKey,
        };
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post('https://libretranslate.com/translate', payload));
        return response.data;
    }
};
exports.TranslateController = TranslateController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TranslateController.prototype, "translate", null);
exports.TranslateController = TranslateController = __decorate([
    (0, common_1.Controller)('translate'),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], TranslateController);
//# sourceMappingURL=translate.controller.js.map