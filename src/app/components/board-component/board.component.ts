import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DataRequest } from 'src/app/services/request.service';
import { SnackBarComponent } from '../snack-bars/snack-bar.component';
import { TaskType } from '../tasks-list/tasks-list.component';

export interface ColumnType {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

@Component({
  selector: 'single-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers: [DataRequest, SnackBarComponent],
})
export class SingleBoard implements OnInit {
  id = '';
  columns: ColumnType[] = [];
  constructor(
    private route: ActivatedRoute,
    private request: DataRequest,
    private snackBar: SnackBarComponent
  ) {
    route.params.pipe(tap(console.log)).subscribe(({ id }) => (this.id = id));
  }
  ngOnInit(): void {
    this.request
      .getColumns(this.id!)
      .subscribe((columns) => (this.columns = columns));
  }

  addColumn(title: string) {
    this.request
      .addColumn(this.id, title)
      .subscribe((column) => this.columns?.unshift(column));
  }

  // dragOver(ev: DragEvent) {
  //   ev.preventDefault();
  // }
  // handleDrop(ev: DragEvent, columnId: string) {
  //   const sourceTaskId = ev.dataTransfer!.getData('task_id');
  //   const sourceColumnId = ev.dataTransfer?.getData('column_id');
  //   this.request.setTask(sourceTaskId, 0, columnId).subscribe((task) => {
  //     this.ngOnInit();
  //   });
  // }

  deleteTask(ev: CdkDragDrop<TaskType>) {
    console.log(ev);
    // const sourceTaskId = ev.dataTransfer!.getData('task_id');
    // const sourceColumnId = ev.dataTransfer!.getData('column_id');
    // this.request
    //   .deleteTask(this.id, sourceColumnId, sourceTaskId)
    //   .subscribe(({ title }) => {
    //     this.snackBar.show(`Task ${title} has been deleted`);
    //     this.ngOnInit();
    //   });
  }
  checkElement(el: CdkDrag<any>) {
    return !el.data.columnId;
    // return false;
  }
  dropColumn(ev: CdkDragDrop<any>) {
    console.log(ev);
    this.request.setColumn(ev.item.data, ev.currentIndex).subscribe((col) => {
      moveItemInArray(ev.container.data, ev.previousIndex, col.order);
    });

    // if (ev.previousContainer === ev.container) {
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
