import mongoose from 'mongoose';
import * as db from '../src/db';

describe('MongoDB', () => {

  beforeAll(async () => {
    await db.connect(
      process.env.MONGO_URL, // jest-mongodb 에서 자동 설정
      'test'
    )
  });

  afterAll(async () => {
    await db.disconnect();
  });

  test('MongoDB save test', async () => {
    const User = mongoose.model('user', { name: String });
    const NEW_ADMIN_NAME = 'modolee';
    const admin = new User({ name: NEW_ADMIN_NAME });
    await admin.save();
    const result = await User.findOne({ name: NEW_ADMIN_NAME });
    expect(result.name).toBe(NEW_ADMIN_NAME);
  });
});