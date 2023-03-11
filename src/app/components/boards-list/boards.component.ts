import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataRequest } from 'src/app/services/request.service';

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
  constructor(private request: DataRequest, private route: Router) {}
  ngOnInit(): void {
    this.request.getBoards().subscribe((boards) => (this.boards = boards));
  }
  handleDelete(id: string) {
    console.log(id);
    this.request
      .deleteBoard(id)
      .subscribe(
        () => (this.boards = this.boards!.filter(({ _id }) => _id !== id))
      );
  }
  handleEdit(id: string) {
    this.route.navigate(['boards', id]);
  }
}
