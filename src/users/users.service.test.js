import * as db from '../db';
import * as UsersService from './users.service';

describe('User Service Test', () => {
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

  describe('사용자 생성', () => {
    test('새로운 사용자', async () => {
      // GIVEN
      const userInfo = {
        name: '모도리',
        position: '개발자',
        roles: ['ADMIN']
      };

      // WHEN
      const result = await UsersService.createUser(userInfo);

      // THEN
      expect(result).toMatchObject(userInfo);
    });

    // TODO: 사용자 생성 - 존재하는 사용자
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