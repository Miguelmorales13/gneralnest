import {
    Controller,
    Body,
    Post,
    Get,
    Param,
    UseInterceptors,
    UploadedFiles,
    Put,
    Delete,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImageDTO } from './image.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../../config/constants';

@Controller('api/images')
export class ImagesController {
    constructor(private readonly _images: ImagesService) {}

    /**
     * Gets image controller
     * @returns  images[]
     */
    @Get()
    getAll() {
        return this._images.getAll();
    }
    /**
     * Gets image controller
     * @param id by image
     * @returns  image
     */
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this._images.getOne(id);
    }
    /**
     * Posts image controller
     * @param image to new image
     * @returns  new image
     */
    @Post()
    @UseInterceptors(
        FilesInterceptor('image', 1, generateStorageMulter('images')),
    )
    create(@Body() image: ImageDTO, @UploadedFiles() files) {
        return this._images.created({
            ...image,
            url: files[0].path,
        } as ImageDTO);
    }
    /**
     * Posts image controller
     * @param image to new image
     * @returns  new image
     */
    @Post('multi')
    @UseInterceptors(
        FilesInterceptor('image', 4, generateStorageMulter('images')),
    )
    async createMulti(@Body() image: ImageDTO[], @UploadedFiles() files) {
        return { yes: files };
    }
    /**
     * Puts image controller
     * @param id  by image
     * @param image params to new image
     * @returns  image updated
     */
    @Put(':id')
    update(@Param('id') id: string, @Body() image: ImageDTO) {
        return this._images.updated(id, image as ImageDTO);
    }

    /**
     * Deletes image controller
     * @param id
     * @returns
     */
    @Delete(':id')
    delete(@Param('id') id: string) {
        return this._images.deleted(id);
    }
}
