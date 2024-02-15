import * as mongoose from 'mongoose';
import seedData from './seedData';

export default class Database {
  public static open(mongoURI) {
    return new Promise((resolve, reject) => {
      mongoose.connect(mongoURI, async (err) => {
        if (err) {
          console.log('Error', err);
          return reject(err);
        }
        console.log('Successfully connected to database...', mongoURI);
        await seedData();
        return resolve('Success');
      });
    });
  }
  public static disconnect() {
    mongoose.disconnect();
  }
}