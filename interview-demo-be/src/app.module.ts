import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';
import { SendersModule } from './senders/senders.module';
import { AuthModule } from './auth/auth.module';
import { TranslateModule } from './translate/translate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.5.6'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MessagesModule, SendersModule, TranslateModule, AuthModule],
})
export class AppModule {}
