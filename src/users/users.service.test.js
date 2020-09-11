import * as db from '../db';
import * as UsersService from './users.service';
import userModel from './user.model';

describe('User Service Test', () => {

  // GIVEN
  const userInfo = {
    name: '모도리',
    position: '개발자',
    roles: ['ADMIN']
  };

  // 전체 테스트 시작 전
  beforeAll(async () => {
    await db.connect(
      process.env.MONGO_URL, // jest-mongodb 에서 자동 설정
      'test'
    );
  });

  // 전체 테스트 종료 후
  afterAll(async () => {
    await db.disconnect();
  });

  // 각 테스트 시작 전
  beforeEach(async () => {
    await userModel.deleteMany({});
  });

  describe('사용자 생성', () => {
    test('존재하는 사용자', async () => {
      // GIVEN

      let firstResult, secondResult;
      try {
      // WHEN
        firstResult = await UsersService.createUser(userInfo);
        secondResult = await UsersService.createUser(userInfo);
      } catch(err) {
        // THEN
        expect(firstResult).toMatchObject(userInfo);
        expect(err).toMatchObject(new Error(`User '모도리' already exists`));
      } finally {
        expect(secondResult).toBeUndefined();
      }
    });
    test('새로운 사용자', async () => {
      // GIVEN

      // WHEN
      const result = await UsersService.createUser(userInfo);

      // THEN
      expect(result).toMatchObject(userInfo);
    });
  });

  describe('사용자 조회', () => {
    // TODO: 존재하지 않는 사용자
    // TODO: 존재하는 사용자
  });

  describe('사용자 갱신', () => {
    // TODO: 존재하지 않는 사용자
    // TODO: 존재하는 사용자
  });

  describe('사용자 삭제', () => {
    // TODO: 존재하지 않는 사용자
    // TODO: 존재하는 사용자
  });


});