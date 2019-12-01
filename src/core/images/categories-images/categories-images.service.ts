import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesImages, ICategoriesImages } from './GategoriesImages.entity';
import { Repository } from 'typeorm';
import { CategoryImagesDTO } from './category-images.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CategoriesImagesService {
    private service: string = 'CategoriesImagesService';
    /**
     * Creates an instance of category service.
     * @param repCategoriesImages
     */
    constructor(
        @InjectModel("CategoriesImages") private readonly repCategoriesImages: Model<ICategoriesImages>,
    ) {}

    /**
     * Gets all categorys
     * @returns {Promise<CategoriesImagesEntity[]>} categorys un database
     */
    async getAll(): Promise<ICategoriesImages[]> {
        return await this.repCategoriesImages.find( { deletedAt: null });
    }

    /**
     * Gets one category
     * @param {number} id  key  to category serched
     * @returns {Promise<CategoriesImagesEntity>} category serched
     */
    async getOne(_id: string): Promise<ICategoriesImages> {
        const category = await this.repCategoriesImages.findOne({
            _id
        });
        if (!category) {
            throw new HttpException(
                {
                    error: 'No se encontro la categoria',
                    where: this.service + '::getOne',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        return category;
    }
    /**
     * Creates category service
     * @param {CategoryImagesDTO} newCategoriesImages data to create new category
     * @returns  { Promise<CategoriesImagesEntity>} category created
     */
    async created(
        newCategoriesImages: Partial<CategoryImagesDTO>,
    ): Promise<ICategoriesImages> {
        const category = await this.repCategoriesImages.create( newCategoriesImages );
        return category
    }

    /**
     * Updated category service
     * @param {number} id key to category update
     * @param  {CategoryImagesDTO} category new data for category updated
     * @returns {Promise<CategoryImagesDTO[]>} category updated
     */
    async updated(
        _id: string,
        category: Partial<CategoryImagesDTO>,
    ): Promise<ICategoriesImages> {
        const categoryUpdated = await this.repCategoriesImages.findOne({_id,deletedAt:null});
        if (!categoryUpdated) {
            throw new HttpException(
                {
                    error: 'No se encontro la categoria',
                    where: this.service + '::updated',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await this.repCategoriesImages.updateOne({ _id }, {
            ...category,
        } as ICategoriesImages);
        return { ...categoryUpdated, ...category } as ICategoriesImages;
    }

    /**
     * Deletes category service update status deletedAt true
     * @param {number}  id key category to deleted
     * @returns {Promise<{deleted:boolean}>} status deleted category
     */
    async deleted(_id: string): Promise<{ deleted: boolean }> {
        const category = await this.repCategoriesImages.findById({_id,deletedAt:null} );
        if (!category) {
            throw new HttpException(
                {
                    error: 'No se encontro la categoryn',
                    where: this.service + '::deleted',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await category.update( { deletedAt: new Date() });
        return { deleted: true };
    }
}
