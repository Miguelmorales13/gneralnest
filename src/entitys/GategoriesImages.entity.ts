import { Entity, Column, OneToMany } from 'typeorm';
import { Generar } from './General.entity';
import { ImageEntity } from './Image.entity';

/**
 * Entity  rol
 */
@Entity('categories_images')
export class CategoriesImagesEntity extends Generar {
    @Column({ length: 100, unique: true })
    name: string;

    @Column({ length: 100, nullable: true })
    description: string;

    @Column({ default: false })
    isSystem: boolean;

    @OneToMany((type) => ImageEntity, (image) => image.category)
    images: ImageEntity[];
}
