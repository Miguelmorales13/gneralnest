import { Rol } from '../../entities/rol.entity';

export const rolesProviders = [
	{
		provide: 'ROLES_REPOSITORY',
		useValue: Rol,
	},
];
