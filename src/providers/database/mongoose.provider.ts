import * as mongoose from 'mongoose';
import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { enumDatabases } from '../../config/constants';

export const mongoProviders = [
	{
		provide: enumDatabases.Unique,
		imports: [ConfigModule],
		useFactory: async (config: ConfigService): Promise<any> => mongoose.createConnection(config.get('MONGO_CONNECTION'), { useUnifiedTopology: true, useNewUrlParser: true }),
		inject: [ConfigService],
	},

];
