import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmConfigService } from './typeorm-config.service';
import { ConfigService } from '@nestjs/config';

const configServiceMock = () => ({ get: () => undefined });

describe('StripeService', () => {
  let service: TypeOrmConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmConfigService,
        { provide: ConfigService, useFactory: configServiceMock },
      ],
    }).compile();

    service = module.get<TypeOrmConfigService>(TypeOrmConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('createTypeOrmOptions()', async () => {
    expect(await service.createTypeOrmOptions()).not.toBeNull();
  });
});
