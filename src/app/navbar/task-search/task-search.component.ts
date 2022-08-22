import { Component } from "@angular/core";

import { Task } from "src/app/tasks/shared/task.model";
import { TaskService } from "src/app/tasks/shared/task.service";

@Component({
  selector: 'task-search',
  templateUrl: './task-search.html'
})

export class TaskSearchComponent {
  public constructor(private taskService: TaskService){}
}