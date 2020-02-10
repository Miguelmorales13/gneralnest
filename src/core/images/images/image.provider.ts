import { Image } from '../../../entitys/Image.entity';

export const imagesProviders = [
	{
		provide: 'IMAGES_REPOSITORY',
		useValue: Image,
	},
];
