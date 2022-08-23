import { Component, OnInit } from "@angular/core";

import { Task } from "src/app/tasks/shared/task.model";
import { TaskService } from "src/app/tasks/shared/task.service";

import { Observable, of, Subject } from "rxjs";

import { switchMap} from 'rxjs/operators';
@Component({
  selector: 'task-search',
  templateUrl: './task-search.html'
})

export class TaskSearchComponent implements OnInit{
  public searchTerms: Subject<string> = new Subject();
  public tasks: Task[] = [];

  public constructor(private taskService: TaskService){}

  public ngOnInit() {
    this.searchTerms.pipe(switchMap(
      term => term ? this.taskService.searchByTitle(term) : Observable.of<Task[]>([]))
    ).subscribe(tasks => console.log(tasks))
  }

  public search(term: string){
    this.searchTerms.next(term);
  }
}