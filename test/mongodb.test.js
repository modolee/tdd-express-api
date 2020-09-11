import mongoose from 'mongoose';
describe('MongoDB', () => {

  beforeAll(async () => {
    await mongoose.connect(
      `${process.env.MONGO_URL}`,
      {
        dbName: 'test',
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('MongoDB save test', async () => {
    const User = mongoose.model('user', { name: String });
    const admin = new User({ name: 'modolee' });
    await admin.save();
    const result = await User.findOne({name: 'modolee'});
    expect(result.name).toBe('modolee');
  });
});