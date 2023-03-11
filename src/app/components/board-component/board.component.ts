import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DataRequest } from 'src/app/services/request.service';
import { BoardType } from '../boards-list/boards.component';

@Component({
  selector: 'single-board',
  templateUrl: './board.component.html',
  providers: [DataRequest],
})
export class SingleBoard implements OnInit {
  id?: string;
  board?: BoardType;
  constructor(private route: ActivatedRoute, private request: DataRequest) {
    console.log(route);
    route.params.pipe(tap(console.log)).subscribe(({ id }) => (this.id = id));
    // route.paramMap.subscribe(console.log);
  }
  ngOnInit(): void {
    this.request
      .getBoards<BoardType>(this.id)
      .subscribe((board) => (this.board = board));
  }
}
