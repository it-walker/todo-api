import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

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
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return `createTask Success! Prameter [title:${title}, descritpion:${description}]`;
  }

  @Delete('/:id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return `deleteTask Success! Prameter [id:${id}]`;
  }

  @Patch('/:id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    return `updateTask Success! Prameter [id:${id}, status:${status}]`;
  }
}
