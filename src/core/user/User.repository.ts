import { Repository, DeepPartial, EntityRepository, EntityManager, AbstractRepository, ObjectType, ObjectID, FindOneOptions, Not } from "typeorm";
import { User } from '../../entitys/user.entity';



@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
	create(user: ObjectType<User>): User {
		return this.manager.create<User>(user)
	}
	// this.repo.findByIds
	// this.repo.delete
	// this.repo.update
	// this.repo.find
	// this.repo.findAndCount
	// this.repo.insert
	findOne(user: ObjectType<User>, id?: string | number | Date | ObjectID, operations?: FindOneOptions<User>): Promise<User> {
		let where = null;
		if (operations && operations.where && typeof operations.where == "object") {
			switch (typeof operations.where) {
				case "string":
					where = `${operations.where} AND deletedAt = null`

					break;
				case "object":
					Array.isArray(operations.where)
					where = [
						{
							deletedAt: null,
						},
						...Array(operations.where)
					]
					break;
			}

		}
		return this.manager.findOne<User>(user, id, {
			where: where ? where : { deletedAt: null }
		}
		)
	}
}
