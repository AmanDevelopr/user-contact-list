import { userModel } from './UserModel';
import IUserModel from './IUserModel';
import { Query, Model, UpdateQuery } from 'mongoose';
import VersionableRepository from '../versionable/VersionableRepository';

export default class UserRepository extends VersionableRepository<IUserModel, Model<IUserModel>> {

constructor() {
super(userModel);
}

public findOne(query: any): Query<IUserModel, IUserModel, {}> {
return super.findOne(query).lean();
}

public find(query: any, projection?: any, options?: any): Query<IUserModel[], IUserModel> {
return super.find(query, projection, options);
}

public count(query: any = {}): Query<number, IUserModel> {
return super.count(query);
}

public create(data: any): Promise<IUserModel> {
return super.create(data);
}

public update(data: any): Promise<IUserModel> {
return super.update(data);
}

public async delete(filter: any): Promise<void> {
    console.log(filter.originalId, "data::check");
    await super.softDelete(filter.originalId);
}
}
