import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { DataRequest } from 'src/app/services/request.service';

export interface TaskType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
}

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() boardId!: string;
  @Input() columnId!: string;
  // @Input() colLength!: number;

  tasks: TaskType[] = [];
  count: number;
  dropContainersIds: string[] = [];
  constructor(private request: DataRequest) {
    this.count = 1;
  }
  ngOnInit(): void {
    this.request
      .getTasks(this.boardId, this.columnId)
      .subscribe((tasks) => (this.tasks = [...tasks]));
    // for (let i = 0; i < this.colLength; i += 1) {
    //   this.dropContainersIds.push('cdk-drop-list-' + i);
    // }
    // console.log(this.dropContainersIds);
  }
  addTask(title: string, description: string) {
    this.request
      .addTask(this.boardId, this.columnId, {
        title: title + (this.count++).toString(),
        order: 0,
        description,
        users: [],
      })
      .subscribe((task) => this.tasks?.push(task));
  }

  dragStart(ev: DragEvent, id: string) {
    ev.dataTransfer?.setData('task_id', id);
    ev.dataTransfer?.setData('column_id', this.columnId);
    console.log('start', ev, id);
  }

  drop(ev: CdkDragDrop<TaskType[], TaskType[], TaskType>) {
    console.log(ev);
    this.request
      .setTask(ev.item.data._id, ev.currentIndex, this.columnId)
      .subscribe((task) => {
        if (ev.previousContainer === ev.container) {
          moveItemInArray(ev.container.data, ev.previousIndex, task.order);
        } else {
          transferArrayItem(
            ev.previousContainer.data,
            ev.container.data,
            ev.previousIndex,
            ev.currentIndex
          );
        }
      });
    // if (ev.previousContainer === ev.container) {
    //   moveItemInArray(ev.container.data, ev.previousIndex, ev.currentIndex);
    // } else {
    //   transferArrayItem(
    //     ev.previousContainer.data,
    //     ev.container.data,
    //     ev.previousIndex,
    //     ev.currentIndex
    //   );
    // }
  }
}
