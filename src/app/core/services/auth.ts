import { Injectable } from '@angular/core';
import { User, UserRole } from '../model/user/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'users';
  private readonly CURRENT_USER_KEY = 'currentUser';
  private readonly TOKEN_KEY = 'authToken';
  constructor() {
    this.initializeUsers();
  }
  private initializeUsers(): void {
    const existingUsers = localStorage.getItem(this.USERS_KEY);
    if (!existingUsers) {
      const users: User[] = [
        {
          id: 1,
          username: 'hr',
          password: 'hr123',
          name: 'HR User',
          role: 'HR'
        },
        {
          id: 2,
          username: 'lead',
          password: 'lead123',
          name: 'Team Lead',
          role: 'TEAM_LEAD'
        },
        {
          id: 3,
          username: 'member',
          password: 'member123',
          name: 'Team Member',
          role: 'TEAM_MEMBER'
        }
      ];
      localStorage.setItem(
        this.USERS_KEY,
        JSON.stringify(users)
      );
    }
  }
  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(
      u =>
        u.username === username &&
        u.password === password
    );
    if (!user) {
      return false;
    }
    localStorage.setItem(
      this.CURRENT_USER_KEY,
      JSON.stringify(user)
    );
    const fakeToken = btoa(
      `${user.username}:${user.role}:${Date.now()}`
    );
    localStorage.setItem(
      this.TOKEN_KEY,
      fakeToken
    );
    return true;
  }
  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
  isLoggedIn(): boolean {
    return localStorage.getItem(
      this.CURRENT_USER_KEY
    ) !== null;
  }
  getCurrentUser(): User | null {
    const user = localStorage.getItem(
      this.CURRENT_USER_KEY
    );
    return user ? JSON.parse(user) : null;
  }
  getCurrentRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  getToken(): string | null {
    return localStorage.getItem(
      this.TOKEN_KEY
    );
  }
  getUsers(): User[] {
    const users = localStorage.getItem(
      this.USERS_KEY
    );
    return users ? JSON.parse(users) : [];
  }
  createUser(
    name: string,
    username: string,
    password: string,
    role: UserRole
  ): boolean {
    const users = this.getUsers();
    const existingUser = users.find(
      u => u.username === username
    );
    if (existingUser) {
      return false;
    }
    const newUser: User = {
      id: Date.now(),
      name,
      username,
      password,
      role
    };
    users.push(newUser);
    localStorage.setItem(
      this.USERS_KEY,
      JSON.stringify(users)
    );
    return true;
  }
}