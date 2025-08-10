import { ApiProperty } from '@nestjs/swagger';

export class LastMessageDto {
    @ApiProperty({ example: 'abc123' })
    userId: string;

    @ApiProperty({ example: 'Hello there' })
    content: string;

    @ApiProperty({ example: '2025-08-06T12:34:56.000Z' })
    timestamp: Date;
}
