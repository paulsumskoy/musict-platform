import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';

describe('Track lifecycle', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    return app.close();
  });

  it('User can create track', () => {
    return request(app.getHttpServer())
      .post('/tracks')
      .send({ name: 'john', artist: 'doe', text: 'blabla' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body.name).toBe('john');
      });
  });
});
