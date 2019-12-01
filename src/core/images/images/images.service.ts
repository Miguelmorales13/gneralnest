import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import {  IImage } from './Image.entity';
import { ImageDTO } from './image.dto';
// import { unlinkSync } from 'fs';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class ImagesService {
    private service: string = 'ImageService';
    /**
     * Creates an instance of image service.
     * @param repImage
     */
    constructor(
        @InjectModel("Images") private readonly repImage: Model<IImage>,
    ) {}

    /**
     * Gets all images
     * @returns {Promise<IImage[]>} images un database
     */
    async getAll(): Promise<IImage[]> {
        return await this.repImage.find({ });
    }

    /**
     * Gets one image
     * @param {number} id  key  to image serched
     * @returns {Promise<IImage>} image serched
     */
    async getOne(_id: string): Promise<IImage> {
        const image = await this.repImage.findOne({_id, } );
        if (!image) {
            throw new HttpException(
                {
                    error: 'No se encontro la imagen',
                    where: this.service + '::getOne',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        return image;
    }
    /**
     * Creates image service
     * @param {ImageDTO} newImage data to create new image
     * @returns  { Promise<IImage>} image created
     */
    async created(newImage: Partial<ImageDTO>): Promise<IImage> {

        const image = await this.repImage.create({
            ...newImage,
        } as IImage);
        return image;
    }

    /**
     * Updated image service
     * @param {number} id key to image update
     * @param  {ImageDTO} image new data for image updated
     * @returns {Promise<ImageDTO[]>} image updated
     */
    async updated(_id: string, image: Partial<ImageDTO>): Promise<IImage> {
        const imageUpdated = await this.repImage.findOne( { _id,deletedAt:null } );
        if (!imageUpdated) {
            throw new HttpException(
                {
                    error: 'No se encontro la imagen',
                    where: this.service + '::updated',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await this.repImage.update({ _id }, { ...image } as IImage);
        return { ...imageUpdated, ...image } as IImage;
    }

    /**
     * Deletes image service update status deletedAt true
     * @param {number}  id key image to deleted
     * @returns {Promise<{deleted:boolean}>} status deleted image
     */
    async deleted(_id: string): Promise<{ deleted: boolean }> {
        const image = await this.repImage.findOne( { _id,deletedAt:null } );
        if (!image) {
            throw new HttpException(
                {
                    error: 'No se encontro la imagen',
                    where: this.service + '::deleted',
                },
                HttpStatus.NOT_FOUND,
            );
        }
        await image.update( { deletedAt: new Date() });
        return { deleted: true };
    }
}
