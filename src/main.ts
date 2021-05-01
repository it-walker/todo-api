import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as listEndpoints from 'express-list-endpoints';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = new ConfigService();
  const sync = configService.get('DB_SYNC');
  console.log(`TypeORM synchronize is [ ${sync} ]`);

  const port = configService.get('API_PORT');
  await app.listen(port);

  const server = app.getHttpServer();
  const router = server._events.request._router;
  const endpoints = listEndpoints(router);
  endpoints.forEach((endpoint) => {
    console.log(
      `${endpoint.methods.filter((v, i, a) => a.indexOf(v) === i)} ${
        endpoint.path
      }`,
    );
  });
}
bootstrap();
