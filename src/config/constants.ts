import { diskStorage } from 'multer';
import { extname } from 'path';
import * as uuid from 'uuid/v4';

export type Uploads = 'images' | 'pdfs' | 'xlsx' | 'sdks';
export enum UploadsEnum {
	images = 'images',
	pdfs = 'pdfs',
	xlsx = 'xlsx',
	sdks = 'sdks',
}

export enum enumDatabases {
	Unique = 'MONGO_CONNECTION',
}
export enum modelsMongo {
	Testing = 'TEST_MODEL',
}
/**
 * Generates storage multer
 * @param [type] url file type
 * @param [maxSize] file size in megabites
 * @returns  config to disk storage
 */
export const generateStorageMulter = (
	type: Uploads = 'images',
	maxSize: number = 3,
) => ({
	storage: diskStorage({
		destination: `./public/uploads/${type}`,
		filename: (req, file, cb) => {
			return cb(null, `${uuid()}${extname(file.originalname)}`);
		},
	}),
	limits: {
		fileSize: maxSize * 1024 * 1024,
	},
});
/**
 * Generates password
 * @param size
 * @returns password
 */
export const HeadersGlobals: any = [
	{
		name: 'accept-language',
		description:
			'Serves for internationalization "pt" = portugues, "es"= "Español", "en"= Ingles ',
		required: false,
	},
];
export function generatePassword(size: number): string {
	let chars = 'abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789';
	let password = '';
	for (let i = 0; i < size; i++)
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	return password;
}

/**
 * Methods
 */
export enum Methods {
	GET = 'GET',
	DELETE = 'DELETE',
	PUT = 'PUT',
	POST = 'POST',
	PATCH = 'PATCH',
}
export const ROLES = [
	{
		id: 1,
		name: 'Super Administrador',
	},
];
export const USERS = [
	{
		id: 1,
		name: 'admin',
		user: 'adminMaster',
		email: 'miguel.moralesr@hotmail.com',
		password: 'admin123',
		lastName: 'admin',
		secondLastName: 'admin',
		firstLogin: true,
		rolId: 1,
		active: true,
	},
];

export const MODULES: Array<any> = [
	{
		id: 1,
		name: 'names.modules.security',
		keyName: 'security',
		description: 'Security administration',
	},
];

export const ACCESSES: Array<any> = [
	{
		id: 1,
		name: 'names.accesses.users',
		keyName: 'users-admins',
		description: 'Users administration in admins company',
		moduleId: 1,
	},
	{
		id: 2,
		name: 'names.accesses.roles',
		keyName: 'roles-admins',
		description: 'Roles administration in admins company',
		moduleId: 1,
	},
];
