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

@Controller('tasks')
export class TasksController {
  @Get()
  getTasks() {
    return 'getTasks Success!';
  }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return `getTaskById Success! Parameter [id:${id}]`;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() taskPropertyDto: TaskPropertyDto) {
    const { title, description } = taskPropertyDto;
    return `createTask Success! Prameter [title:${title}, descritpion:${description}]`;
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return `deleteTask Success! Prameter [id:${id}]`;
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusPipe) status: string,
  ) {
    return `updateTask Success! Prameter [id:${id}, status:${status}]`;
  }
}
