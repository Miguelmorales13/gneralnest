import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '../../../entitys/Image.entity';
import { HelpersModule } from '../../../helpers/helpers.module';
import { ImagesService } from './images.service';
@Module({
    imports: [
        TypeOrmModule.forFeature([ImageEntity]),
        HelpersModule,
    ],
    providers: [ ImagesService],
    controllers: [ImagesController],
    exports: [ ImagesService],
})
export class ImagesModule {}
