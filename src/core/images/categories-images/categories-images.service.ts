import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CategoriesImagesEntity } from '../../../entitys/GategoriesImages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryImagesDTO } from './category-images.dto';

@Injectable()
export class CategoriesImagesService {
    private service: string = 'CategoriesImagesService';
    /**
     * Creates an instance of category service.
     * @param repCategoriesImages
     */
    constructor(
        @InjectRepository(CategoriesImagesEntity)
        private repCategoriesImages: Repository<CategoriesImagesEntity>,
    ) {}

    /**
     * Gets all categorys
     * @returns {Promise<CategoriesImagesEntity[]>} categorys un database
     */
    async getAll(): Promise<CategoriesImagesEntity[]> {
        return await this.repCategoriesImages.find({
            where: { deletedAt: null },
        });
    }

    /**
     * Gets one category
     * @param {number} id  key  to category serched
     * @returns {Promise<CategoriesImagesEntity>} category serched
     */
    async getOne(id: number): Promise<CategoriesImagesEntity> {
        const category = await this.repCategoriesImages.findOne({
            id,
            deletedAt: null,
        });
        if (!category) {
            throw new HttpException(
                {
                    error: 'No se encontro la categoryn',
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
    ): Promise<CategoriesImagesEntity> {
        const category = await this.repCategoriesImages.create(
            newCategoriesImages as CategoriesImagesEntity,
        );
        await this.repCategoriesImages.save(category);
        return await this.repCategoriesImages.findOne({
            where: { id: category.id },
        });
    }

    /**
     * Updated category service
     * @param {number} id key to category update
     * @param  {CategoryImagesDTO} category new data for category updated
     * @returns {Promise<CategoryImagesDTO[]>} category updated
     */
    async updated(
        id: number,
        category: Partial<CategoryImagesDTO>,
    ): Promise<CategoriesImagesEntity> {
        const categoryUpdated = await this.repCategoriesImages.findOne(id);
        if (!categoryUpdated) {
            throw new HttpException(
                {
                    error: 'No se encontro la categoryn',
                    where: this.service + '::updated',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await this.repCategoriesImages.update({ id }, {
            ...category,
        } as CategoriesImagesEntity);
        return { ...categoryUpdated, ...category } as CategoriesImagesEntity;
    }

    /**
     * Deletes category service update status deletedAt true
     * @param {number}  id key category to deleted
     * @returns {Promise<{deleted:boolean}>} status deleted category
     */
    async deleted(id: number): Promise<{ deleted: boolean }> {
        const category = await this.repCategoriesImages.findOne({ id });
        if (!category) {
            throw new HttpException(
                {
                    error: 'No se encontro la categoryn',
                    where: this.service + '::deleted',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await this.repCategoriesImages.update(
            { id },
            { deletedAt: new Date() },
        );
        return { deleted: true };
    }
}
