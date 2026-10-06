export type UserRole = 'TEAM_LEAD' | 'TEAM_MEMBER' | 'HR';

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  role: UserRole;
}