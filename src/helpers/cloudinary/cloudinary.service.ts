import { Injectable } from '@nestjs/common';
import { config, v2 } from 'cloudinary';
import { ConfigService } from '../../config/config.service';
@Injectable()
export class CloudinaryService {
	constructor(private readonly _config: ConfigService) {
		config({
			cloud_name: _config.get('CLOUDINARY_NAME'),
			api_key: _config.get('CLOUDINARY_API_KEY'),
			api_secret: _config.get('CLOUDINARY_API_SECRET'),
		});
	}

	async uploadImage(path: string) {
		return await v2.uploader.upload(path);
	}
}
