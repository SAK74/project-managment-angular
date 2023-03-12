import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { DataRequest } from 'src/app/services/request.service';
import { TaskComponent } from '../task-component/task.component';

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
  // imports:[TaskComponent]
})
export class SingleBoard implements OnInit {
  id = '';
  columns: ColumnType[] | null = null;
  constructor(private route: ActivatedRoute, private request: DataRequest) {
    console.log(route);
    route.params.pipe(tap(console.log)).subscribe(({ id }) => (this.id = id));
    // route.paramMap.subscribe(console.log);
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

  dragOver(ev: DragEvent) {
    ev.preventDefault();
    console.log(ev);
  }
  handleDrop(ev: DragEvent, columnId: string) {
    const sourceTaskId = ev.dataTransfer!.getData('task_id');
    const sourceColumnId = ev.dataTransfer?.getData('column_id');
    console.log(ev, sourceTaskId, sourceColumnId);
    this.request.setTask(sourceTaskId, 0, columnId).subscribe((task) => {
      // this.columns?.find((column) => column._id === task.columnId);
      this.ngOnInit();
    });
  }
}
