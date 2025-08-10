import { Module } from '@nestjs/common';
import { TranslateController } from './translate.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    controllers: [TranslateController],
})
export class TranslateModule {}