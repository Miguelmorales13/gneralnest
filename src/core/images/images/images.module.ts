import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../../../entitys/Image.entity';
import { HelpersModule } from '../../../helpers/helpers.module';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
@Module({
	imports: [
		TypeOrmModule.forFeature([Image]),
		HelpersModule,
	],
	providers: [ImagesService],
	controllers: [ImagesController],
	exports: [ImagesService],
})
export class ImagesModule { }
