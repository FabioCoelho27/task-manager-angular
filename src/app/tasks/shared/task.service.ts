import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Task } from "./task.model";


@Injectable()

export class TaskService{
  public tasksUrl = "api/tasks"

  public constructor(private http: HttpClient) {}
  
  public getTasks(): Observable<Task[] | undefined>{
    return this.http.get(this.tasksUrl)
    .pipe(map((response: any) => response as Task[])) 
  }

  public getImportantTasks(): Observable<Task[] | undefined>{
    return this.getTasks()
    .pipe(map(tasks => { 
      if(tasks) {
        return tasks.slice(0,3)
      }
      return tasks;
    })
    )
  }
  public getTask(id: number): Observable<Task | undefined> {
    let url = `${this.tasksUrl}/${id}`
    return this.http.get(url)
    .pipe(map((response: any) => response as Task)) 
  }
}