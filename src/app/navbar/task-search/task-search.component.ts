import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Task } from "src/app/tasks/shared/task.model";
import { TaskService } from "src/app/tasks/shared/task.service";

import { Observable, of, Subject } from "rxjs";

import { switchMap} from 'rxjs/operators';
@Component({
  selector: 'task-search',
  templateUrl: './task-search.component.html'
})

export class TaskSearchComponent implements OnInit{
  public searchTerms: Subject<string> = new Subject();
  public tasks: Task[] = [];

  public constructor(private taskService: TaskService, private router: Router){}

  public ngOnInit() {
    this.searchTerms.pipe(switchMap(
      term => term ? this.taskService.searchByTitle(term) : new Observable<Task[]>)
    ).subscribe(tasks => console.log(tasks))
  }

  public search(term: string){
    this.searchTerms.next(term);
  }
  public gotoTask(task: Task) {
    this.tasks = [],
    this.router.navigate(['/tasks', task.id])
  }
}