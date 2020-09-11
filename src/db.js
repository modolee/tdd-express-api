import mongoose from 'mongoose';

export const connect = (uri, dbName) => {
  mongoose.set('useCreateIndex', true);
  return mongoose.connect(
    uri,
    {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
};

export const disconnect = () => {
  return mongoose.disconnect();
}
