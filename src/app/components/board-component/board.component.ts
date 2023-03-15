import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    route.params.subscribe(({ id }) => (this.id = id));
  }
  ngOnInit(): void {
    this.request
      .getColumns(this.id!)
      .subscribe(
        (columns) => (this.columns = columns.sort((a, b) => a.order - b.order))
      );
  }

  addColumn(title: string) {
    this.request
      .addColumn(this.id, title)
      .subscribe((column) => this.columns?.unshift(column));
  }

  deleteTask(ev: CdkDragDrop<TaskType>) {
    console.log('Trash', ev);
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
  }

  dropColumn(ev: CdkDragDrop<ColumnType[], ColumnType[], string>) {
    console.log('Board: ', ev);
    this.request.setColumn(ev.item.data, ev.currentIndex).subscribe((col) => {
      // console.log(col);
      moveItemInArray(ev.container.data, ev.previousIndex, ev.currentIndex);
    });
  }
}
