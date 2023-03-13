import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'title-component',
  templateUrl: './title.component.html',
})
export class TitleComponent implements OnInit {
  @Input() title!: string;
  @Output() titleChange = new EventEmitter<string>();
  mode: 'show' | 'edit' = 'show';
  ctr = new FormControl('', { nonNullable: true });
  ngOnInit(): void {
    this.ctr.setValue(this.title);
  }
  editTitle() {
    this.mode = 'edit';
  }
  onSubmit() {
    this.titleChange.emit(this.ctr.value);
    this.mode = 'show';
  }
}
