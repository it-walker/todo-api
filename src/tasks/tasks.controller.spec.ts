import { Test } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from '@/api/database/entities/task.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

function createTask(
  id?: number,
  title?: string,
  description?: string,
  status?: string,
): Task {
  const task = new Task();
  task.id = id ?? 1;
  task.title = title ?? 'タイトル';
  task.description = description ?? '説明';
  task.status = status ?? '完了';
  return task;
}

describe('TasksController', () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useClass: Repository,
        },
      ],
    }).compile();

    tasksService = moduleRef.get<TasksService>(TasksService);
    tasksController = moduleRef.get<TasksController>(TasksController);
  });

  describe('getTasks()', () => {
    it('should return an array of tasks', async () => {
      const result = [new Task()];
      jest
        .spyOn(tasksService, 'getTasks')
        .mockImplementation(async () => result);

      expect(await tasksController.getTasks()).toBe(result);
    });
  });

  describe('getTaskById()', () => {
    it('success pattern', async () => {
      const baseTask = createTask();

      jest
        .spyOn(tasksService, 'getTaskById')
        .mockImplementation(async () => baseTask);

      expect(await tasksController.getTaskById(baseTask.id)).toBe(baseTask);
    });
  });

  describe('createTask()', () => {
    it('success pattern', async () => {
      const baseTask = createTask();

      jest
        .spyOn(tasksService, 'createTask')
        .mockImplementation(async () => baseTask);

      expect(await tasksController.createTask(baseTask)).toBe(baseTask);
    });
  });

  describe('deleteTask()', () => {
    it('success pattern', async () => {
      const baseTask = createTask();
      jest.spyOn(tasksService, 'deleteTask').mockImplementation();

      expect(await tasksController.deleteTask(baseTask.id)).toBeUndefined();
    });
  });

  describe('updateTask()', () => {
    it('success pattern', async () => {
      const baseTask = createTask();
      const status = 'AFTER';
      const expectedValue = createTask(undefined, undefined, undefined, status);
console.log(expectedValue)
      jest
        .spyOn(tasksService, 'updateTask')
        .mockImplementation(async () => expectedValue);

      expect(
        await tasksController.updateTask(baseTask.id, status),
      ).toMatchObject(expectedValue);
    });
  });
});
