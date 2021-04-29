import { IsNotEmpty } from 'class-validator';

export class TaskPropertyDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
