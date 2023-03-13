import { Component, Input, OnInit } from '@angular/core';
import { DataRequest } from 'src/app/services/request.service';
import { ColumnType } from '../board-component/board.component';

@Component({
  selector: 'column-component',
  templateUrl: './column.component.html',
})
export class ColumnComponent implements OnInit {
  @Input() boardId!: string;
  @Input() column!: ColumnType;
  constructor(private reqest: DataRequest) {}
  ngOnInit() {}

  onSubmit(title: string) {
    this.updateCol(title).subscribe(({ title }) => (this.column.title = title));
  }
  updateCol(title: string) {
    return this.reqest.updateColumn(this.boardId, this.column._id, {
      order: 0,
      title,
    });
  }
}
