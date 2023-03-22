import { CreateTaskType } from '../tasks-list/model';

export type CreatedType = 'board' | 'column' | 'task' | 'edit';

export interface DialogDataType {
  type: CreatedType;
  taskData?: CreateTaskType;
}
