import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { Logger } from '../entitys/Logger.entity';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { EmailsService } from './emails/emails.service';
import { GateLoggerGateway } from './logger/gate-logger.gateway';
import { LoggerService } from './logger/logger.service';

@Module({
	imports: [ConfigModule, TypeOrmModule.forFeature([Logger])],
	providers: [EmailsService, LoggerService, GateLoggerGateway, CloudinaryService],
	exports: [EmailsService, LoggerService, GateLoggerGateway, CloudinaryService],
})
export class HelpersModule { }
