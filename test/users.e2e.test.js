import request from 'supertest';
import app from '../src/app';
import * as db from '../src/db';
import userModel from '../src/users/user.model';

describe('사용자 API 테스트', () => {
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
      const expectedData = {
        errors: [
          {
            location: 'body',
            msg: 'Invalid value',
            param: 'roles'
          }
        ]
      };
      expect(result.status).toBe(400);
      expect(result.body).toEqual(expectedData);
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
      const expectedData = {
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
      expect(result.status).toBe(400);
      expect(result.body).toEqual(expectedData);
    });

    test('정상적인 인자를 넘겨 받은 경우 - 존재하는 사용자', async () => {
      // GIVEN
      const userInfo = {
        name: '모도리',
        position: '개발자',
        roles: ['ADMIN']
      };

      // WHEN
      const firstResult =
        await request(app)
          .post('/users')
          .type('application/json')
          .send(userInfo)

      const secondResult =
        await request(app)
          .post('/users')
          .type('application/json')
          .send(userInfo)

      // THEN
      expect(firstResult.status).toBe(201);
      expect(firstResult.body).toMatchObject({ data: userInfo });

      expect(secondResult.status).toBe(403);
      expect(secondResult.body).toMatchObject({ error: `User '모도리' already exists` });
    });

    test('정상적인 인자를 넘겨 받은 경우 - 새로운 사용자', async () => {
      // GIVEN
      const userInfo = {
        name: '모도리',
        position: '개발자',
        roles: ['ADMIN']
      };

      // WHEN
      const result =
        await request(app)
          .post('/users')
          .type('application/json')
          .send(userInfo)

      // THEN
      expect(result.status).toBe(201);
      expect(result.body).toMatchObject({ data: userInfo });
    });
  });

  describe('사용자 조회', () => {
    // TODO: 없는 사용자를 조회하는 경우
    // TODO: 있는 사용자를 조회하는 경우
  });

  describe('사용자 갱신', () => {
    // TODO: 없는 사용자를 업데이트하려는 경우
    // TODO: 있는 사용자를 업데이트하려는 경우
  });

  describe('사용자 삭제', () => {
    // TODO: 없는 사용자를 삭제하려는 경우
    // TODO: 있는 사용자를 삭제하려는 경우
  });
});