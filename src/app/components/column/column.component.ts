import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataRequest } from 'src/app/services/request.service';
import { TranslatService } from 'src/app/services/translate.service';
import { ColumnType } from '../board-component/board.component';
import { ConfirmComponent } from '../modal-dialogs/confirm-component';

@Component({
  selector: 'column-component',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css'],
})
export class ColumnComponent {
  @Input() boardId!: string;
  @Input() column!: ColumnType;
  @Output() onDelete = new EventEmitter<ColumnType['_id']>();
  constructor(
    private request: DataRequest,
    private dialog: MatDialog,
    private translator: TranslatService
  ) {}

  onSubmit(title: string) {
    this.updateCol(title).subscribe(({ title }) => (this.column.title = title));
  }
  updateCol(title: string) {
    return this.request.updateColumn(this.boardId, this.column._id, {
      order: this.column.order,
      title,
    });
  }
  handleDelete() {
    const confirmDialog = this.dialog.open(ConfirmComponent, {
      data: this.translator.translate('delete this column'),
    });
    confirmDialog.afterClosed().subscribe((submit) => {
      if (submit) {
        this.request
          .deleteColumn(this.boardId, this.column._id)
          .subscribe(({ _id }) => {
            this.onDelete.emit(_id);
          });
      }
    });
  }
}
