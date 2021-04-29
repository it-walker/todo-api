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
import { Task } from '../database/entities/task.entity';
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
    // return `getTaskById Success! Parameter [id:${id}]`;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createTask(@Body() taskPropertyDto: TaskPropertyDto): Promise<Task> {
    // const { title, description } = taskPropertyDto;
    // return `createTask Success! Prameter [title:${title}, descritpion:${description}]`;
    return await this.tasksService.createTask(taskPropertyDto);
  }

  @Delete('/:id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<void> {
    // return `deleteTask Success! Prameter [id:${id}]`;
    await this.tasksService.deleteTask(id);
  }

  @Patch('/:id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ) {
    // return `updateTask Success! Prameter [id:${id}, status:${status}]`;
    return await this.tasksService.updateTask(id, status);
  }
}
