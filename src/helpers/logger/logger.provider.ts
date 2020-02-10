import { Logger } from '../../entitys/Logger.entity';

export const loggersProviders = [
	{
		provide: 'LOGGERS_REPOSITORY',
		useValue: Logger,
	},
];
