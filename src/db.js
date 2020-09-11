import mongoose from 'mongoose';

export const connect = (uri, dbName) => {
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
