import { ApiProperty } from "@nestjs/swagger";



export class General {
	@ApiProperty({ description: 'This property is unique to identify the data' })
	id?: number

	@ApiProperty({ description: 'This property marks the date of creation' })
	createdAt?: number

	@ApiProperty({ description: 'This property marks the last update date' })
	updatedAt?: number
}
