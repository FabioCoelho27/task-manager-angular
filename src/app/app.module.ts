// angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http"

// components imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.componet';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailComponent } from './tasks/task-detail/task-detail.component';

// services imports
import { TaskService } from './tasks/shared/task.service';

// modules imports
import { AppRoutingModule } from './app-routing.module';

// in memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryTaskDataService } from './in-memory-task-data.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    TasksComponent,
    TaskDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(InMemoryTaskDataService)
  ],
  providers: [
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
