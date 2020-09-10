import mongoose from 'mongoose';
describe('MongoDB', () => {
  let db;

  beforeAll(async () => {
    db = await mongoose.connect(
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
    const Cat = mongoose.model('Cat', { name: String });
    const kitty = new Cat({ name: 'Zildjian' });
    await kitty.save();
    const result = await Cat.findOne({name: 'Zildjian'});
    expect(result.name).toBe('Zildjian');
  });
});