import * as mongoose from 'mongoose';
import UserSchema from './UserSchema';
import IUserModel from './IUserModel';

export const userSchema = new UserSchema({
  collection: 'contact_list_user',
});

export const userModel: mongoose.Model<IUserModel> = mongoose.model<IUserModel>(
  'User_Contacts',
  userSchema,
);
