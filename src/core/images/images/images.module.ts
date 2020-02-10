import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../../../entitys/Image.entity';
import { HelpersModule } from '../../../helpers/helpers.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { DatabaseModule } from '../../../providers/database.module';
import { imagesProviders } from './image.provider';
@Module({
	imports: [
		DatabaseModule,
		HelpersModule,
	],
	providers: [ImagesService, ...imagesProviders],
	controllers: [ImagesController],
	exports: [ImagesService],
})
export class ImagesModule { }
