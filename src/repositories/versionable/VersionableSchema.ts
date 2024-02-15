import { Schema } from 'mongoose';

export default class VersionableSchema extends Schema {
  constructor(options: any, collections: any) {
    const versionedOptions = Object.assign({
      originalId: {
        required: true,
        type: String,
      },
      createdAt: {
        default: Date.now,
        type: Date,
      },
      deletedAt: {
        required: false,
        type: Date,
      },
    }, options);
    super(versionedOptions, collections);
  }
}