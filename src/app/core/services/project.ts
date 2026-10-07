import { Injectable, signal } from '@angular/core';
import { Project, ProjectTask } from '../model/project/model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly PROJECTS_KEY = 'projects';
  private readonly projectsState = signal<Project[]>(this.loadProjects());

  readonly projects = this.projectsState.asReadonly();

  createProject(name: string, description: string): Project {
    const project: Project = {
      id: Date.now(),
      name,
      description,
      createdAt: new Date().toISOString(),
      tasks: []
    };

    this.saveProjects([...this.projectsState(), project]);
    return project;
  }

  createTask(projectId: number, title: string, description: string): boolean {
    const projects = this.projectsState();
    const project = projects.find((item) => item.id === projectId);

    if (!project) {
      return false;
    }

    const task: ProjectTask = {
      id: Date.now(),
      projectId,
      title,
      description,
      status: 'TODO'
    };

    this.saveProjects(
      projects.map((item) =>
        item.id === projectId
          ? { ...item, tasks: [...item.tasks, task] }
          : item
      )
    );
    return true;
  }

  completeTask(projectId: number, taskId: number): boolean {
    const project = this.projectsState().find((item) => item.id === projectId);
    const task = project?.tasks.find((item) => item.id === taskId);

    if (!project || !task || task.status === 'COMPLETED') {
      return false;
    }

    this.saveProjects(
      this.projectsState().map((item) =>
        item.id === projectId
          ? {
              ...item,
              tasks: item.tasks.map((projectTask) =>
                projectTask.id === taskId
                  ? { ...projectTask, status: 'COMPLETED' }
                  : projectTask
              )
            }
          : item
      )
    );
    return true;
  }

  private loadProjects(): Project[] {
    const storedProjects = localStorage.getItem(this.PROJECTS_KEY);

    if (!storedProjects) {
      return [];
    }

    try {
      return JSON.parse(storedProjects) as Project[];
    } catch {
      return [];
    }
  }

  private saveProjects(projects: Project[]): void {
    this.projectsState.set(projects);
    localStorage.setItem(this.PROJECTS_KEY, JSON.stringify(projects));
  }
}
