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
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],

  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.loginForm = this.fb.group({

      username: [
        '',
        [
          Validators.required
        ]
      ],

      password: [
        '',
        [
          Validators.required
        ]
      ]

    });
  }

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {
      username,
      password
    } = this.loginForm.value;

    const success = this.authService.login(
      username,
      password
    );

    if (!success) {

      this.errorMessage =
        'Invalid username or password';

      return;
    }

    this.errorMessage = '';

    const role = this.authService.getCurrentRole();

    switch (role) {

      case 'HR':
        this.router.navigate(['/hr/dashboard']);
        break;

      case 'TEAM_LEAD':
        this.router.navigate(['/team-lead/dashboard']);
        break;

      case 'TEAM_MEMBER':
        this.router.navigate(['/team-member/dashboard']);
        break;

    }
  }
}