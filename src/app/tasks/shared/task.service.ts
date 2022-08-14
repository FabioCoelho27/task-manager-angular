import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Task } from "./task.model";

const TASKS: Array<Task> = [
  { id: 1, title: 'Fazer tarefa 1'},
  { id: 2, title: 'Fazer tarefa 2'},
  { id: 3, title: 'Fazer tarefa 3'},
  { id: 4, title: 'Fazer tarefa 4'},
  { id: 5, title: 'Fazer tarefa 5'},
  { id: 6, title: 'Fazer tarefa 6'},
  { id: 7, title: 'Fazer tarefa 7'}
  
];
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
      return TASKS;
    })
    )
  }
  public getTask(id: number): Observable<Task | undefined> {
    let url = `${this.tasksUrl}/${id}`
    return this.http.get(url)
    .pipe(map((response: any) => response as Task)) 
  }
}