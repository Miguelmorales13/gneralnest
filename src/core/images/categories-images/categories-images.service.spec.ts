import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesImagesService } from './categories-images.service';

describe('CategoriesImagesService', () => {
	let service: CategoriesImagesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [CategoriesImagesService],
		}).compile();

		service = module.get<CategoriesImagesService>(CategoriesImagesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
