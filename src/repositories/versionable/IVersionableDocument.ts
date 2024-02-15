import { Document } from 'mongoose';

export default interface IVersionableDocument extends Document {
  originalId: string;
  deletedAt: Date;
  createdAt: Date;
}