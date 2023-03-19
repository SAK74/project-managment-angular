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
  login: FormControl<string>;
  password?: FormControl<string>;
  name?: FormControl<string>;
}
export interface UserFormType {
  login: string;
  password: string;
  name?: string;
}

@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css'],
})
export class FormComponent implements OnInit {
  @Input() type!: 'login' | 'signup' | 'edit';
  @Output() onSubmit = new EventEmitter<typeof this.userForm.value>();
  title: string = '';
  constructor(private store: Store<StoreType>) {}
  userForm = new FormGroup<UserForm>({
    login: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, pasValidator],
      nonNullable: true,
    }),
  });

  ngOnInit() {
    switch (this.type) {
      case 'login':
        this.title = 'Log in';
        break;
      case 'signup':
        this.title = 'Sign up';
        break;
      case 'edit':
        this.title = 'Edit profile';
        break;
      default:
        return;
    }
    if (this.type === 'signup' || this.type === 'edit') {
      this.userForm.addControl(
        'name',
        new FormControl('', {
          validators: Validators.required,
          nonNullable: true,
        })
      );
      if (this.type === 'edit') {
        this.store.select('user').subscribe(({ login, name, _id }) => {
          this.userForm.setValue({ login, name, password: '' });
        });
      }
    }
  }

  handleSubmit(val: typeof this.userForm.value) {
    this.onSubmit.emit(val);
  }
  get name() {
    return this.userForm.get('name');
  }
  clear() {
    console.log('cleared'); // dont work...?
    this.userForm.reset();
  }
}

const pasValidator = (control: AbstractControl): ValidationErrors | null => {
  const expected = /\d+/.test(control.value);
  return expected ? null : { passwordFormat: 'at least one digit' };
};
