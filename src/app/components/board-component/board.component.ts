import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DataRequest } from 'src/app/services/request.service';
import { CreateBoardComponent } from '../modal-dialogs/create-component';
import { DialogDataType } from '../modal-dialogs/model';

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
  title = '';
  constructor(
    private route: ActivatedRoute,
    private request: DataRequest,
    private dialog: MatDialog
  ) {
    route.params.subscribe(({ id }) => {
      this.id = id;
      request.getBoard(id).subscribe(({ title }) => (this.title = title));
    });
  }
  ngOnInit(): void {
    this.request
      .getColumns(this.id!)
      .subscribe(
        (columns) => (this.columns = columns.sort((a, b) => a.order - b.order))
      );
  }

  addColumn() {
    const refDialog = this.dialog.open<
      CreateBoardComponent,
      DialogDataType,
      { title: string } | null
    >(CreateBoardComponent, {
      data: { type: 'column' },
    });
    refDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.request
          .addColumn(this.id, res.title)
          .subscribe((column) => this.columns?.unshift(column));
      }
    });
  }

  addColClick = this.addColumn.bind(this);

  checkElement(el: CdkDrag<any>) {
    return !el.data.columnId;
  }

  dropColumn(ev: CdkDragDrop<ColumnType[], ColumnType[], string>) {
    moveItemInArray(ev.container.data, ev.previousIndex, ev.currentIndex);
    this.request
      .setColumn(this.columns.map((col, ind) => ({ order: ind, _id: col._id })))
      .subscribe({
        error: () => {
          moveItemInArray(ev.container.data, ev.currentIndex, ev.previousIndex);
        },
      });
  }
}
