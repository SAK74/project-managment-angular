import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export type CreatedType = 'board' | 'column' | 'task';
interface CreateFormType {
  title: FormControl<string>;
  description?: FormControl<string>;
}

@Component({
  selector: 'form-create-component',
  templateUrl: './form.component.html',
})
export class FormCreateComponent implements OnInit {
  @Input() type!: CreatedType;
  @Output() onSubmit = new EventEmitter<typeof this.createForm.value>();
  createForm = new FormGroup<CreateFormType>({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  ngOnInit(): void {
    if (this.type === 'task') {
      this.createForm.addControl(
        'description',
        new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        })
      );
    }
  }
  handleSubmit() {
    console.log('submited');
    this.onSubmit.emit(this.createForm.value);
  }
}
