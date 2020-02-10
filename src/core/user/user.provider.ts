import { User } from '../../entitys/user.entity';

export const usersProviders = [
	{
		provide: 'USERS_REPOSITORY',
		useValue: User,
	},
];
