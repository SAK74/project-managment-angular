import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
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
  passwordType: 'hidden' | 'visible' = 'hidden';
  constructor(private store: Store<StoreType>) {}
  userForm = new FormGroup<UserForm>({
    login: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), pasValidator],
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
          validators: [Validators.required, Validators.minLength(5)],
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
    if (this.userForm.valid) {
      this.onSubmit.emit(val);
    }
  }

  get name() {
    return this.userForm.get('name');
  }
  get login() {
    return this.userForm.get('login');
  }
  get password() {
    return this.userForm.get('password');
  }

  getErrorMessage(name: keyof UserForm) {
    const field = this.userForm.get(name);
    if (field?.hasError('required')) {
      return 'Fill this field';
    }
    if (field?.hasError('minlength')) {
      return `Require ${field.errors?.['minlength']['requiredLength']} symbols`;
    }
    if (field?.hasError('passwordFormat')) {
      return field.errors?.['passwordFormat'];
    }
  }

  clear() {
    this.userForm.reset();
  }

  changePasswordType() {
    this.passwordType = this.passwordType === 'hidden' ? 'visible' : 'hidden';
  }
}

const pasValidator = (control: AbstractControl): ValidationErrors | null => {
  const pattern = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/;
  const expected = pattern.test(control.value);
  return expected
    ? null
    : {
        passwordFormat:
          'require at least one digit, one uppercase, one lowercase',
      };
};
