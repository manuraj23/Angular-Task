import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { AuthService } from '../../../core/services/auth';
import { Project, ProjectTask } from '../../../core/model/project/model';
import { ProjectService } from '../../../core/services/project';

@Component({
  selector: 'app-team-lead-dashboard',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
  ],

  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class TeamLeadDashboardComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly projectService = inject(ProjectService);
  private readonly router = inject(Router);

  readonly projects = this.projectService.projects;
  readonly taskProjectId = signal<number | null>(null);
  readonly projectForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    description: ['', [Validators.required, Validators.maxLength(300)]]
  });
  readonly taskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.maxLength(300)]]
  });

  createProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const { name, description } = this.projectForm.getRawValue();
    this.projectService.createProject(name.trim(), description.trim());
    this.projectForm.reset();
  }

  openTaskForm(projectId: number): void {
    this.taskProjectId.set(projectId);
    this.taskForm.reset();
  }

  closeTaskForm(): void {
    this.taskProjectId.set(null);
    this.taskForm.reset();
  }

  createTask(): void {
    const projectId = this.taskProjectId();
    if (projectId === null || this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { title, description } = this.taskForm.getRawValue();
    this.projectService.createTask(projectId, title.trim(), description.trim());
    this.closeTaskForm();
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