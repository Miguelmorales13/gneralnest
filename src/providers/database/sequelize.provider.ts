import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '../../config/config.service';
import { User } from '../../entitys/user.entity';
import { Logger } from '../../entitys/Logger.entity';
import { Rol } from '../../entitys/rol.entity';
import { Image } from '../../entitys/Image.entity';
import { CategoryImages } from '../../entitys/GategoriesImages.entity';

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
			});
			sequelize.addModels([User, Logger, Rol, Image, CategoryImages]);
			await sequelize.sync();
			return sequelize;
		},
		inject: [ConfigService]
	},
];
