import { Rol } from '../../entitys/rol.entity';

export const rolsProviders = [
	{
		provide: 'ROLS_REPOSITORY',
		useValue: Rol,
	},
];
