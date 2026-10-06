import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login';
import { TeamLeadDashboardComponent } from './features/team-lead/dashboard/dashboard';
import { TeamMemberDashboardComponent } from './features/team-member/dashboard/dashboard';
import { HrDashboardComponent } from './features/hr/dashboard/dashboard';
import { CreateUserComponent } from './features/hr/create-user/create-user';
import { Unauthorized } from './features/unauthorized/unauthorized';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [

    {
        path: 'login',
        component: LoginComponent
    },

    {
        path: 'team-lead/dashboard',
        component: TeamLeadDashboardComponent,
        canActivate: [
            authGuard,
            roleGuard
        ],
        data: {
            role: 'TEAM_LEAD'
        }
    },

    {
        path: 'team-member/dashboard',
        component: TeamMemberDashboardComponent,
        canActivate: [
            authGuard,
            roleGuard
        ],
        data: {
            role: 'TEAM_MEMBER'
        }
    },

    {
        path: 'hr/dashboard',
        component: HrDashboardComponent,
        canActivate: [
            authGuard,
            roleGuard
        ],
        data: {
            role: 'HR'
        }
    },

    {
        path: 'hr/create-user',
        component: CreateUserComponent,
        canActivate: [
            authGuard,
            roleGuard
        ],
        data: {
            role: 'HR'
        }
    },

    {
        path: 'unauthorized',
        component: Unauthorized
    },

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: '**',
        redirectTo: 'login'
    }
];