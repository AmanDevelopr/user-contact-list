import VersionableSchema from '../versionable/VersionableSchema';
class UserSchema extends VersionableSchema {
  constructor(collections: any) {
    const baseSchema = Object.assign({
      _id: String,
      name: String,
      email: String,
      phoneNumber: String,
    });
    super(baseSchema, collections);
  }
}
export default UserSchema;
