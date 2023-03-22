import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTaskType } from '../tasks-list/tasks-list.component';

export type CreatedType = 'board' | 'column' | 'task' | 'edit';
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
  @Input() taskData?: CreateTaskType;
  @Output() onSubmit = new EventEmitter<typeof this.createForm.value>();
  createForm = new FormGroup<CreateFormType>({
    title: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  ngOnInit(): void {
    if (this.type === 'task' || this.type === 'edit') {
      this.createForm.addControl(
        'description',
        new FormControl('', {
          validators: [Validators.required],
          nonNullable: true,
        })
      );
      if (this.taskData) {
        this.createForm.setValue({
          title: this.taskData.title,
          description: this.taskData.description,
        });
      }
    }
  }
  handleSubmit() {
    console.log('submited');
    this.onSubmit.emit(this.createForm.value);
  }
}
