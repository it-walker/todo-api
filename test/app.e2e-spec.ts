import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '@/api/app.module'
import { HttpStatus } from '@nestjs/common'

const baseRequest = {
  title: 'タイトル',
  description: '説明',
}

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    // TODO: テスト実行終了後にテーブルをきれいにしたい
    await app.close()
  })

  describe('findAll', () => {
    const baseUrl = '/tasks'
    it('/tasks', () => {
      return request(app.getHttpServer()).get(baseUrl).expect('Content-Type', /json/).expect(HttpStatus.OK)
    })
  })

  describe('find', () => {
    it('getTaskById', () => {
      return request(app.getHttpServer()).get('/tasks?id=1').expect('Content-Type', /json/).expect(HttpStatus.OK)
    })
  })

  describe('create', () => {
    const baseUrl = '/tasks/create'
    it('success pattern', () => {
      return request(app.getHttpServer())
        .post(baseUrl)
        .send(baseRequest)
        .expect('Content-Type', /json/)
        .expect(HttpStatus.CREATED)
    })
  })

  describe('delete', () => {
    const baseUrl = '/tasks/delete'
    it.todo('success pattern')

    it('base url だけの指定だと404エラーとなること', () => {
      return request(app.getHttpServer()).delete(baseUrl).expect(HttpStatus.NOT_FOUND)
    })

    it('不正なIDを指定したとき、400エラーとなること', () => {
      return request(app.getHttpServer()).delete(`${baseUrl}/a`).expect(HttpStatus.BAD_REQUEST)
    })
  })

  describe('update', () => {
    const baseUrl = '/tasks/update'
    it('success pattern', () => {
      const updateRequest = { status: 'DONE' }
      return request(app.getHttpServer()).patch(`${baseUrl}/1`).send(updateRequest).expect(HttpStatus.OK)
    })

    it('base url だけの指定だと404エラーとなること', () => {
      return request(app.getHttpServer()).patch(baseUrl).expect(HttpStatus.NOT_FOUND)
    })

    it('不正なIDを指定したとき、400エラーとなること', () => {
      const updateRequest = { status: 'donee' }
      return request(app.getHttpServer()).patch(`${baseUrl}/1`).send(updateRequest).expect(HttpStatus.BAD_REQUEST)
    })

    it.todo('不正なステータスを指定したとき、400エラーとなること')
  })
})
