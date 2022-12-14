import { Component, OnInit } from "@angular/core";

import { Task } from "../tasks/shared/task.model";
import { TaskService } from "../tasks/shared/task.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit{
  public tasks?: Task[] | undefined;

  public constructor(private taskService: TaskService){
  }

  public ngOnInit(): void {
    this.taskService.getImportant()
      .subscribe(
        tasks => this.tasks = tasks,
        Error => alert("Ocorreu um erro no servidor, tente mais tarde.")
      )
  }
}