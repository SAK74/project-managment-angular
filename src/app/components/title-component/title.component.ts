import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'title-component',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
})
export class TitleComponent implements OnInit {
  @Input() title!: string;
  @Output() titleChange = new EventEmitter<string>();
  mode: 'show' | 'edit' = 'show';
  ctr = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  });
  ngOnInit(): void {
    this.ctr.setValue(this.title);
  }
  editTitle() {
    this.mode = 'edit';
  }
  showTitle() {
    this.mode = 'show';
  }
  onSubmit() {
    this.titleChange.emit(this.ctr.value);
    this.mode = 'show';
  }
}
