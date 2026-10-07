import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../../core/services/auth';
import { Project, ProjectTask } from '../../../core/model/project/model';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-team-member-dashboard',
  imports: [
    MatButtonModule,
    MatCardModule
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class TeamMemberDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);

  readonly projects = this.projectService.projects;

  completeTask(projectId: number, taskId: number): void {
    this.projectService.completeTask(projectId, taskId);
  }

  isProjectCompleted(project: Project): boolean {
    return project.tasks.length > 0 && project.tasks.every((task) => task.status === 'COMPLETED');
  }

  completedTaskCount(project: Project): number {
    return project.tasks.filter((task) => task.status === 'COMPLETED').length;
  }

  trackProject(_index: number, project: Project): number {
    return project.id;
  }

  trackTask(_index: number, task: ProjectTask): number {
    return task.id;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}