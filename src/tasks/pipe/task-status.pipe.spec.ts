import { BadRequestException } from '@nestjs/common';
import { TaskStatusPipe } from './task-status.pipe';

describe('TaskStatusPipe', () => {
  it('success pattern', () => {
    const pipe = new TaskStatusPipe();
    expect(pipe.transform('open')).toBe('OPEN');
  });

  it('不正なステータスが指定されたとき404エラーが発生すること', () => {
    const pipe = new TaskStatusPipe();
    expect(() => {
      pipe.transform('openn');
    }).toThrow(BadRequestException);
  });
});
