import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/services/auth';
import { UserRole } from '../../../core/model/user/model';

@Component({
  selector: 'app-create-user',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],

  templateUrl: './create-user.html'
})
export class CreateUserComponent {

  userForm: FormGroup;

  message = '';

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.userForm = this.fb.group({

      name: [
        '',
        Validators.required
      ],

      username: [
        '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ],

      role: [
        '',
        Validators.required
      ]

    });
  }


  createUser(): void {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    const {
      name,
      username,
      password,
      role
    } = this.userForm.value;

    const success =
      this.authService.createUser(
        name,
        username,
        password,
        role as UserRole
      );

    if (!success) {

      this.errorMessage =
        'Username already exists';

      this.message = '';

      return;
    }

    this.errorMessage = '';

    this.message =
      'User created successfully';

    this.userForm.reset();
  }


  backToDashboard(): void {

    this.router.navigate([
      '/hr/dashboard'
    ]);
  }
}