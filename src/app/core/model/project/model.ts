export type ProjectStatus = 'OPEN' | 'COMPLETED';
export type TaskStatus = 'TODO' | 'COMPLETED';

export interface ProjectTask {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  tasks: ProjectTask[];
}
