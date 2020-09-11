import request from 'supertest';
import app from '../src/app';
import * as db from '../src/db';

describe('User API Test', () => {
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

  describe('CREATE User', () => {
    test('정상적인 인자를 넘겨 받지 못한 경우 - 인자가 없는 경우', async () => {
      // GIVEN
      const userInfo = {
        name: '모도리',
        position: '개발자'
        // roles 가 빠져있음
      };

      // WHEN
      const result =
        await request(app)
          .post('/users')
          .type('application/json')
          .send(userInfo)

      // THEN
      const errorInfo = {
        errors: [
          {
            location: 'body',
            msg: 'Invalid value',
            param: 'roles'
          }
        ]
      };
      expect(result.status).toBe(400)
      expect(result.body).toEqual(errorInfo);
    });

    test('정상적인 인자를 넘겨 받지 못한 경우 - 인자의 타입이 잘못 된 경우', async () => {
      // GIVEN
      const userInfo = {
        name: 0.01, // name이 string이 아님
        position: 1, // position이 string이 아님
        roles: 'ADMIN' // roles가 Array 타입이 아님
      };

      // WHEN
      const result =
        await request(app)
          .post('/users')
          .type('application/json')
          .send(userInfo)

      // THEN
      const errorInfo = {
        errors: [
          {
            location: 'body',
            msg: 'Invalid value',
            param: 'name',
            value: 0.01
          },
          {
            location: 'body',
            msg: 'Invalid value',
            param: 'position',
            value: 1
          },
          {
            location: 'body',
            msg: 'Invalid value',
            param: 'roles',
            value: 'ADMIN'
          }
        ]
      };
      expect(result.status).toBe(400)
      expect(result.body).toEqual(errorInfo);
    });

    // TODO: 정상적인 인자를 넘겨 받은 경우
      // TODO: 새로운 사용자인 경우
      // TODO: 사용자가 이미 존재하는 경우
  });

  describe('READ User', () => {
    // TODO: 없는 사용자를 조회하는 경우
    // TODO: 있는 사용자를 조회하는 경우
  });

  describe('UPDATE User', () => {
    // TODO: 없는 사용자를 업데이트하려는 경우
    // TODO: 있는 사용자를 업데이트하려는 경우
  });

  describe('DELETE User', () => {
    // TODO: 없는 사용자를 삭제하려는 경우
    // TODO: 있는 사용자를 삭제하려는 경우
  });
});