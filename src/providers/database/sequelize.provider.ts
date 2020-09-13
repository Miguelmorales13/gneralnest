import { Sequelize } from 'sequelize-typescript';
import { AccessRolUser } from '../../entities/AccessesRolUser.entity';
import { ConfigService } from '../../config/config.service';
import { CategoryImages } from '../../entities/CategoriesImages.entity';
import { Image } from '../../entities/Image.entity';
import { Rol } from '../../entities/Rol.entity';
import { User } from '../../entities/User.entity';
import { Module } from '../../entities/Module.entity';
import { Access } from '../../entities/Access.entity';

/**
 * data base Provider
 */
export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async (_config: ConfigService) => {
			const sequelize = new Sequelize({
				dialect: _config.get('SEQUELIZE_TYPE'),
				host: _config.get('SEQUELIZE_HOST'),
				port: _config.get('SEQUELIZE_PORT'),
				username: _config.get('SEQUELIZE_USERNAME'),
				password: _config.get('SEQUELIZE_PASSWORD'),
				database: _config.get('SEQUELIZE_DATABASE'),
				models: [Rol, Module, Access, AccessRolUser, Image, User, CategoryImages]
			});
			// sequelize.addModels();
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService],
	},
];
