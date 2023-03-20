import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataRequest } from 'src/app/services/request.service';
import { CreateBoardComponent } from '../modal-dialogs/create-component';

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
export type CreateTaskType = {
  title: string;
  description: string;
};

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() boardId!: string;
  @Input() columnId!: string;

  tasks: TaskType[] = [];
  count: number;
  dropContainersIds: string[] = [];
  constructor(private request: DataRequest, private dialog: MatDialog) {
    this.count = 1;
  }
  ngOnInit(): void {
    this.request
      .getTasks(this.boardId, this.columnId)
      .subscribe(
        (tasks) => (this.tasks = tasks.sort((a, b) => a.order - b.order))
      );
  }
  addTask() {
    const dialogRef = this.dialog.open<
      CreateBoardComponent,
      string,
      CreateTaskType | null
    >(CreateBoardComponent, { data: 'task' });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.request
          .addTask(this.boardId, this.columnId, {
            title: res!.title,
            order: this.tasks.length,
            description: res!.description,
            users: [],
          })
          .subscribe((task) => this.tasks?.push(task));
      }
    });
  }

  delTask(id: string) {
    this.request
      .deleteTask(this.boardId, this.columnId, id)
      .subscribe(
        (task) => (this.tasks = this.tasks.filter((el) => el._id !== task._id))
      );
  }
  drop(ev: CdkDragDrop<TaskType[], TaskType[], string>) {
    console.log('Task', ev);
    this.request
      .setTask(ev.item.data, ev.currentIndex, this.columnId)
      .subscribe((tasks) => {
        // console.log(tasks);
        if (ev.previousContainer === ev.container) {
          moveItemInArray(ev.container.data, ev.previousIndex, ev.currentIndex);
        } else {
          transferArrayItem(
            ev.previousContainer.data,
            ev.container.data,
            ev.previousIndex,
            ev.currentIndex
          );
        }
      });
  }
}
