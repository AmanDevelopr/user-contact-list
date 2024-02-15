import * as mongoose from 'mongoose';
import { Document, Model, Query, UpdateQuery } from 'mongoose';

export default class VersionableRepository<
  D extends Document,
  M extends Model<D>
> {

  private model;
  // private model;
  constructor(model: M) {
    this.model = model;
  }
  public static createObjectId() {
    return String(new mongoose.Types.ObjectId());
  }

  protected findOne(query: any): Query<D, D> {
    const finalQuery = { deletedAt: undefined, ...query };
    return this.model.findOne(finalQuery).lean();
  }

  protected find(
    query: any = {},
    projection: any = {},
    options: any = {}
  ): Query<D[], D> {
    const finalQuery = { deletedAt: undefined, ...query };
    return this.model.find(finalQuery, projection, options);
  }

  public count(query: any = {}): Query<number, D> {
    const finalQuery = { deletedAt: undefined, ...query };
    return this.model.countDocuments(finalQuery);
  }

  public create(options: any): Promise<D> {
    const id = VersionableRepository.createObjectId();
    const model = new this.model({
      _id: id,
      originalId: id,
      ...options,
    });
    return model.save();
  }

  async softDelete(id: string) {
    const query = { originalId: id, deleteAt: undefined };
    const update = { deletedAt: Date.now() };
    const updates = this.model.findOneAndUpdate(query, update).lean();
    
    return updates;
}

  async hardDelete(id: string) {
    return this.model.deleteOne({ originalId: id });
  }

  protected async update(data: any): Promise<D> {
    const prevRecord = await this.find({ originalId: data.originalId });
    if (prevRecord) {
     await this.softDelete(data.originalId);
    } else {
      return undefined;
    }
    const newData = { ...prevRecord, ...data };
    newData._id = VersionableRepository.createObjectId();
    delete newData.deletedAt;
    const model = new this.model(newData);
    return model.save();
  }
}
