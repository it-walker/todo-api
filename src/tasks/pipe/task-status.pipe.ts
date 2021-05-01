import { BadRequestException, PipeTransform } from '@nestjs/common';

export class TaskStatusPipe implements PipeTransform {
  readonly allowStatus = ['OPEN', 'PROGRESS', 'DONE'];

  transform(value: string) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException();
    }

    return value;
  }
  private isStatusValid(status: string) {
    const result = this.allowStatus.indexOf(status);
    return result !== -1;
  }
}
