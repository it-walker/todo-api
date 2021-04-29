import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/typeorm-config.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: [`.env/${process.env.NODE_ENV}.env`, '.env/default.env'],
      isGlobal: true,
    }),
    // TypeORMの設定を非同期取得に変更
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql', // DBの種類
    //   port: 3326, // 使用ポート
    //   database: 'todo_development', // データベース名
    //   host: 'localhost', // DBホスト名
    //   username: 'root', // DBユーザ名
    //   password: 'root', // DBパスワード
    //   synchronize: true, // モデル同期(trueで同期)
    //   entities: [__dirname + '/**/*.entity.{js,ts}'], // ロードするエンティティ
    // }),
  ],
})
export class AppModule {}
