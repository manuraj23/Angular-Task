import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,

  imports: [
    MatButtonModule,
    MatCardModule
  ],

  templateUrl: './dashboard.html'
})
export class HrDashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  createUser(): void {

    this.router.navigate([
      '/hr/create-user'
    ]);
  }

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}