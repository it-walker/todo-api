import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskPropertyDto } from './dto/task-property.dto';
import { TaskStatusPipe } from './pipe/task-status.pipe';
import { Task } from '@/api/database/entities/task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return await this.tasksService.getTasks();
  }

  @Get('/:id')
  async getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return await this.tasksService.getTaskById(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskPropertyDto: TaskPropertyDto): Promise<Task> {
    return await this.tasksService.createTask(taskPropertyDto);
  }

  @Delete('/delete/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.deleteTask(id);
  }

  @Patch('/update/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ) {
    return await this.tasksService.updateTask(id, status);
  }
}
