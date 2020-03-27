import { CategoryImages } from '../../../entities/CategoriesImages.entity';

export const categoryImagesProviders = [
	{
		provide: 'CATEGORY_IMAGES_REPOSITORY',
		useValue: CategoryImages,
	},
];
