import { SendersService } from './senders.service';
import { Sender } from './schemas/sender.schema';
export declare class SendersController {
    private readonly usersService;
    constructor(usersService: SendersService);
    getAllSenders(): Promise<Sender[]>;
}
