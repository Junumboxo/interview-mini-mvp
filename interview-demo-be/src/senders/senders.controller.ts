import {Controller, Get, UseGuards} from '@nestjs/common';
import { SendersService } from './senders.service';
import { Sender } from './schemas/sender.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('senders')
export class SendersController {
    constructor(private readonly usersService: SendersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllSenders(): Promise<Sender[]> {
        return this.usersService.findAll();
    }
}