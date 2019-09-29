import { Module } from '@nestjs/common';
import { EmailsService } from './emails/emails.service';
import { ConfigModule } from '../config/config.module';
import { LoggerService } from './logger/logger.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerEntity } from '../entitys/Logger.entity';
import { GateLoggerGateway } from './logger/gate-logger.gateway';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([LoggerEntity])],
    providers: [EmailsService, LoggerService, GateLoggerGateway, CloudinaryService],
    exports: [EmailsService, LoggerService, GateLoggerGateway,CloudinaryService],
})
export class HelpersModule {}
