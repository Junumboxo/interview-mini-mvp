import { Controller, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Controller('translate')
export class TranslateController {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    @Post()
    async translate(@Body() body: { q: string; source: string; target: string }) {
        const { q, source, target } = body;

        const apiKey = this.configService.get<string>('LIBRETRANSLATE_API_KEY');

        const payload = {
            q,
            source,
            target,
            format: 'text',
            api_key: apiKey,
        };

        const response = await firstValueFrom(
            this.httpService.post('https://libretranslate.com/translate', payload)
        );

        return response.data;
    }
}
