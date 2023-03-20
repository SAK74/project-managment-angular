import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataRequest } from 'src/app/services/request.service';
import { CreateBoardComponent } from '../modal-dialogs/create-component';

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
  providers: [DataRequest],
})
export class SingleBoard implements OnInit {
  id = '';
  columns: ColumnType[] = [];
  constructor(
    private route: ActivatedRoute,
    private request: DataRequest,
    private dialog: MatDialog
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

  addColumn() {
    console.log('create column', this);
    const refDialog = this.dialog.open(CreateBoardComponent, {
      data: 'column',
    });
    // this.request
    //   .addColumn(this.id, ' example title')
    //   .subscribe((column) => this.columns?.unshift(column));
  }

  addColClick = this.addColumn.bind(this);

  // deleteTask(ev: CdkDragDrop<TaskType>) {
  //   console.log('Trash', ev);
  // }
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
