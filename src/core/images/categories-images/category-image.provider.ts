import { CategoryImages } from '../../../entitys/GategoriesImages.entity';

export const categoryImagesProviders = [
	{
		provide: 'CATEGORY_IMAGES_REPOSITORY',
		useValue: CategoryImages,
	},
];
