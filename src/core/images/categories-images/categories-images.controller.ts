import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CategoriesImagesService } from './categories-images.service';
import { CategoryImagesDTO } from './category-images.dto';

@Controller('categories-images')
export class CategoriesController {
	constructor(private readonly _categoryImages: CategoriesImagesService) { }

    /**
     * Gets categoryImage controller
     * @returns  categoryImages[]
     */
	@Get()
	getAll() {
		return this._categoryImages.getAll();
	}
    /**
     * Gets categoryImage controller
     * @param id by categoryImage
     * @returns  categoryImage
     */
	@Get(':id')
	getOne(@Param('id') id: number) {
		return this._categoryImages.getOne(id);
	}
    /**
     * Posts categoryImage controller
     * @param categoryImage to new categoryImage
     * @returns  new categoryImage
     */
	@Post()
	create(@Body() categoryImage: CategoryImagesDTO) {
		return this._categoryImages.created(categoryImage as CategoryImagesDTO);
	}
    /**
     * Puts categoryImage controller
     * @param id  by categoryImage
     * @param categoryImage params to new categoryImage
     * @returns  categoryImage updated
     */
	@Put(':id')
	update(@Param('id') id: number, @Body() categoryImage: CategoryImagesDTO) {
		return this._categoryImages.updated(
			id,
			categoryImage as CategoryImagesDTO,
		);
	}

    /**
     * Deletes categoryImage controller
     * @param id
     * @returns
     */
	@Delete(':id')
	delete(@Param('id') id: number) {
		return this._categoryImages.deleted(id);
	}
}
