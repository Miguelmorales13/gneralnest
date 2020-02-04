import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { unlinkSync } from 'fs';
import { Repository } from 'typeorm';
import { ImageEntity } from '../../../entitys/Image.entity';
import { CloudinaryService } from '../../../helpers/cloudinary/cloudinary.service';
import { ImageDTO } from './image.dto';
@Injectable()
export class ImagesService {
	private service: string = 'ImageService';
    /**
     * Creates an instance of image service.
     * @param repImage
     */
	constructor(
		@InjectRepository(ImageEntity)
		private readonly repImage: Repository<ImageEntity>,
		private readonly _cloudinary: CloudinaryService,
	) { }

    /**
     * Gets all images
     * @returns {Promise<ImageEntity[]>} images un database
     */
	async getAll(): Promise<ImageEntity[]> {
		return await this.repImage.find({
			where: { deletedAt: null },
			relations: ['category'],
		});
	}

    /**
     * Gets one image
     * @param {number} id  key  to image serched
     * @returns {Promise<ImageEntity>} image serched
     */
	async getOne(id: number): Promise<ImageEntity> {
		const image = await this.repImage.findOne(
			{ id, deletedAt: null },
			{ relations: ['category'] },
		);
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
     * @returns  { Promise<ImageEntity>} image created
     */
	async created(newImage: Partial<ImageDTO>): Promise<ImageEntity> {
		const file = await this._cloudinary.uploadImage(newImage.url);

		if (!file) {
			throw new HttpException(
				{
					error: 'No se pudo subir la imagen',
					where: this.service + '::created',
				},
				HttpStatus.SERVICE_UNAVAILABLE,
			);
		}
		await unlinkSync(newImage.url);
		const image = await this.repImage.create({
			...newImage,
			public_id: file.public_id,
			url: file.secure_url,
		} as ImageEntity);
		await this.repImage.save(image);
		return await this.repImage.findOne({
			where: { id: image.id },
			relations: ['category'],
		});
	}

    /**
     * Updated image service
     * @param {number} id key to image update
     * @param  {ImageDTO} image new data for image updated
     * @returns {Promise<ImageDTO[]>} image updated
     */
	async updated(id: number, image: Partial<ImageDTO>): Promise<ImageEntity> {
		const imageUpdated = await this.repImage.findOne(
			{ id },
			{ relations: ['category'] },
		);
		if (!imageUpdated) {
			throw new HttpException(
				{
					error: 'No se encontro la imagen',
					where: this.service + '::updated',
				},
				HttpStatus.NOT_FOUND,
			);
		}
		await this.repImage.update({ id }, { ...image } as ImageEntity);
		return { ...imageUpdated, ...image } as ImageEntity;
	}

    /**
     * Deletes image service update status deletedAt true
     * @param {number}  id key image to deleted
     * @returns {Promise<{deleted:boolean}>} status deleted image
     */
	async deleted(id: number): Promise<{ deleted: boolean }> {
		const image = await this.repImage.findOne(
			{ id },
			{ relations: ['category'] },
		);
		if (!image) {
			throw new HttpException(
				{
					error: 'No se encontro la imagen',
					where: this.service + '::deleted',
				},
				HttpStatus.NOT_FOUND,
			);
		}
		await this.repImage.update({ id }, { deletedAt: new Date() });
		return { deleted: true };
	}
}
