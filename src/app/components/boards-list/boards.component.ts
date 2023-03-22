import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataRequest } from 'src/app/services/request.service';
import { ConfirmComponent } from '../modal-dialogs/confirm-component';
import {
  CreateBoardComponent,
  DialogDataType,
} from '../modal-dialogs/create-component';

export interface BoardType {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}
@Component({
  selector: 'bords-component',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css'],
  providers: [DataRequest],
})
export class BoardsComponent implements OnInit {
  boards: BoardType[] | null = null;
  constructor(
    private request: DataRequest,
    private route: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.request.getBoards().subscribe((boards) => (this.boards = boards));
  }
  handleDelete(id: string) {
    const confirmDialog = this.dialog.open<ConfirmComponent, string, boolean>(
      ConfirmComponent,
      { data: 'delete this board' }
    );
    confirmDialog.afterClosed().subscribe((confirm) => {
      if (confirm) {
        this.request
          .deleteBoard(id)
          .subscribe(
            () => (this.boards = this.boards!.filter(({ _id }) => _id !== id))
          );
      }
    });
  }
  handleEdit(id: string) {
    this.route.navigate(['boards', id]);
  }
  handleTitleChange(title: string, { owner, users, _id }: BoardType) {
    this.request
      .updateBoard(_id, { owner, users, title })
      .subscribe((board) => {
        const idx = this.boards!.findIndex((el) => el._id === board._id);
        this.boards![idx] = board;
      });
  }
  createBoard() {
    console.log('create board', this);
    const createDialog = this.dialog.open<
      CreateBoardComponent,
      DialogDataType,
      { title: string } | null
    >(CreateBoardComponent, {
      data: { type: 'board' },
    });
    createDialog.afterClosed().subscribe((res) => {
      if (res) {
        this.request
          .addBoard(res.title)
          .subscribe((board) => this.boards?.push(board));
      }
    });
  }
  createClick = this.createBoard.bind(this);
}
