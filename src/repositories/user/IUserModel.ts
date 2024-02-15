import * as mongoose from 'mongoose';
import IVersionableDocument from '../versionable/IVersionableDocument';
export default interface IUserModel extends IVersionableDocument, mongoose.Document {
  id: {type: string, required: true, exists: true};
  name: {type: string, required: true, exists: true};
  email: {type: string, required: true, exists: true, unique: true};
  phoneNumber: {type: string, required: true, exists: true, unique: true};
}
