import { Image } from '../../../entities/Image.entity';

export const imagesProviders = [
	{
		provide: 'IMAGES_REPOSITORY',
		useValue: Image,
	},
];
