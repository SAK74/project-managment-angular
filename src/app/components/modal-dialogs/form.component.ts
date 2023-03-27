import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateTaskType } from '../tasks-list/model';
import { CreatedType } from './model';

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
  errorMessage = 'Please fill this field!';
  createForm = new FormGroup<CreateFormType>({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true,
    }),
  });
  ngOnInit(): void {
    if (this.type === 'task' || this.type === 'edit') {
      this.createForm.addControl(
        'description',
        new FormControl('', {
          validators: [Validators.required, Validators.minLength(5)],
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
    this.onSubmit.emit(this.createForm.value);
  }

  getError(name: keyof CreateFormType) {
    if (this.createForm.controls[name]?.hasError('required')) {
      return this.errorMessage;
    }
    const minLength =
      this.createForm.controls[name]?.errors?.['minlength']['requiredLength'];
    return `Required min ${minLength} letter`;
  }
}
