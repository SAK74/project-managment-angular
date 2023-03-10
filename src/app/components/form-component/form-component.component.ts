import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
  // FormBuilder,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreType } from 'src/app/store/model';

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
  @Output() onSubmit = new EventEmitter<UserForm>();
  constructor(private store: Store<StoreType>) {}
  userForm = new FormGroup<UserForm>({
    login: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, pasValidator]),
  });

  ngOnInit() {
    if (this.type === 'signup') {
      this.userForm.addControl(
        'name',
        new FormControl('', Validators.required)
      );
    } else {
      this.store
        .select('user')
        .subscribe((user) => this.userForm.patchValue({ login: user }));
    }
  }
  show() {
    console.log(this.userForm);
  }
  handleSubmit(val: any) {
    this.onSubmit.emit(val);
  }
  get name() {
    return this.userForm.get('name');
  }
  clear() {
    this.userForm.reset();
  }
}

const pasValidator = (control: AbstractControl): ValidationErrors | null => {
  const expected = /\d+/.test(control.value);
  return expected ? null : { passwordFormat: 'at least one digit' };
};
