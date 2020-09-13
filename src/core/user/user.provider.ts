import { User } from '../../entities/User.entity';
import { Connection } from 'mongoose';
import { enumDatabases, modelsMongo } from '../../config/constants';
import { TestSchema } from '../../schemas/test.document';

export const usersProviders = [
	{
		provide: 'USERS_REPOSITORY',
		useValue: User,
	},
];

export const tesProvidersMongo = [
	{
		provide: modelsMongo.Testing,
		useFactory: (connection: Connection) =>
			connection.model('test', TestSchema),
		inject: [enumDatabases.Unique],
	},
];
