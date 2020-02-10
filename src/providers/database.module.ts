import { Module } from '@nestjs/common';
import { databaseProviders } from './database/sequelize.provider';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [ConfigModule],
	providers: [...databaseProviders],
	exports: [...databaseProviders],
})
export class DatabaseModule { }
