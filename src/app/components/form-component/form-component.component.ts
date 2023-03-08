import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  // FormBuilder,
} from '@angular/forms';

export interface UserForm {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
  name?: FormControl<string | null>;
}

@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})
export class FormComponent implements OnInit {
  @Input() type!: 'login' | 'signup';
  // @Input() onSubmit: (values: any) => void = this.handleSubmit;
  @Output() onSubmit = new EventEmitter<UserForm>();
  // constructor(private builder: FormBuilder) {}
  userForm = new FormGroup<UserForm>({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, pasValidator]),
  });

  ngOnInit() {
    console.log(this.userForm.controls, this.type);
    if (this.type === 'signup') {
      this.userForm.addControl(
        'name',
        new FormControl('', Validators.required)
      );
    }
  }
  show() {
    console.log(this.userForm);
  }
  handleSubmit(val: any) {
    alert(JSON.stringify(val));
    this.onSubmit.emit(val);
  }
  get name() {
    return this.userForm.get('name');
  }
}

const pasValidator =
  // (value: string): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const expected = /\d+/.test(control.value);
    return expected ? null : { passwordFormat: 'at least one digit' };
  };
