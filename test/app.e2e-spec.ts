import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '@/api/app.module';
import { HttpStatus } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  function sendRequest(url: string) {
    return request(app.getHttpServer()).get(url);
  }

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tasks', () => {
    return sendRequest('/tasks').expect(200).expect('[]');
  });

  it('tasks/1', () => {
    return sendRequest('/tasks').expect(HttpStatus.OK).expect('[]');
  });

  describe('post', () => {
    it('/tasks/create', () => {
      return sendRequest('/tasks/create');
    });
  });
});
