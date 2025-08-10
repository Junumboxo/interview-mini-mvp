import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class TranslateController {
    private readonly httpService;
    private readonly configService;
    constructor(httpService: HttpService, configService: ConfigService);
    translate(body: {
        q: string;
        source: string;
        target: string;
    }): Promise<any>;
}
