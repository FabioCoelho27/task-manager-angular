import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { SignUpFormComponent } from './sign-up-form/sign-up-form.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

import { AuthGuard } from './guards/auth.guard';

const ROUTES = RouterModule.forRoot([
  { path: '', redirectTo: '/dashboard',pathMatch: 'full' },
  { path: 'dashboard',component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'sign-up',component: SignUpFormComponent },
  { path: 'sign-in', component: SignInFormComponent }
])

@NgModule({
  imports: [ROUTES],
  exports: [RouterModule]
})
export class AppRoutingModule { }
