import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataRequest } from 'src/app/services/request.service';
import { TranslatService } from 'src/app/services/translate.service';
import { CreateBoardComponent } from '../modal-dialogs/create-component';
import { DialogDataType } from '../modal-dialogs/model';
import { CreateTaskType, TaskType } from './model';

@Component({
  selector: 'tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css'],
})
export class TaskComponent implements OnInit {
  @Input() boardId!: string;
  @Input() columnId!: string;

  tasks: TaskType[] = [];
  dropContainersIds: string[] = [];
  constructor(
    private request: DataRequest,
    private dialog: MatDialog,
    private translator: TranslatService
  ) {}
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
      DialogDataType,
      CreateTaskType | null
    >(CreateBoardComponent, { data: { type: 'task' } });
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
    this.request
      .setTask(ev.item.data, ev.currentIndex, this.columnId)
      .subscribe((tasks) => {
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
  deleteTask(taskId: string) {
    this.request
      .deleteTask(this.boardId, this.columnId, taskId)
      .subscribe(({ _id }) => {
        this.tasks = this.tasks.filter((task) => task._id !== _id);
      });
  }
  editTask(task: TaskType) {
    const modal = this.dialog.open<
      CreateBoardComponent,
      DialogDataType,
      CreateTaskType | null | 'delete'
    >(CreateBoardComponent, {
      data: {
        type: 'edit',
        taskData: { title: task.title, description: task.description },
      },
    });
    modal.afterClosed().subscribe((res) => {
      if (res) {
        if (res === 'delete') {
          this.deleteTask(task._id);
        } else {
          const { order, users } = task;
          this.request
            .updateTask(this.boardId, this.columnId, task._id, {
              order,
              title: res.title,
              description: res.description,
              users,
            })
            .subscribe((task) => {
              const idx = this.tasks.findIndex((el) => el._id === task._id);
              this.tasks[idx] = task;
            });
        }
      }
    });
  }

  translate(text: string) {
    return this.translator.translate(text);
  }
}
