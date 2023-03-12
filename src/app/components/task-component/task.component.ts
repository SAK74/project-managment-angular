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
  selector: 'task-component',
  template: `<ul>
      <li *ngFor="let task of tasks">{{ task.title }}</li>
    </ul>
    <button (click)="addTask('new task', 'new description')">
      add task
    </button> `,
  // standalone: true,
})
export class TaskComponent implements OnInit {
  @Input() boardId!: string;
  @Input() columnId!: string;

  tasks: TaskType[] | null = null;
  constructor(private request: DataRequest) {}
  ngOnInit(): void {
    this.request
      .getTasks(this.boardId, this.columnId)
      .subscribe((tasks) => (this.tasks = [...tasks]));
  }
  addTask(title: string, description: string) {
    this.request
      .addTask(this.boardId, this.columnId, {
        title,
        order: 0,
        description,
        users: [],
      })
      .subscribe((task) => this.tasks?.push(task));
  }
}
