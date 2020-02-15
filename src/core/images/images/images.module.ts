import { Module } from '@nestjs/common';

import { HelpersModule } from '../../../helpers/helpers.module';
import { DatabaseModule } from '../../../providers/database.module';
import { imagesProviders } from './image.provider';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

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
