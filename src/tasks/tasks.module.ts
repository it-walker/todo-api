import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Task } from '@/api/database/entities/task.entity'
import { TasksController } from './tasks.controller'
import { TasksService } from './tasks.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]), // 追加
  ],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
