import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-team-lead-dashboard',
  standalone: true,

  imports: [
    MatButtonModule,
    MatCardModule
  ],

  templateUrl: 'dashboard.html'
})
export class TeamLeadDashboardComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}