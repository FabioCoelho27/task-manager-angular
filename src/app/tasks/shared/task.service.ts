import {HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { Task } from "./task.model";

@Injectable()
export class TaskService {
  public tasksUrl = "api/tasks";

  public constructor(private http: HttpClient) {}

  public getTasks(): Observable<Task[]>{
    return this.http.get(this.tasksUrl)
    .pipe(map((response: any) => response as Task[]))
    .pipe(catchError((error) => this.handleErrors(error)));
  }

  public getImportantTasks(): Observable<Task[]>{
    return this.getTasks()
    .pipe(
      map(tasks => {
        return tasks ? tasks.slice(0, 3) : tasks;
      }),
      catchError((error) => this.handleErrors(error))
    );
  }
  public getTask(id: number): Observable<Task> {
    let url = `${this.tasksUrl}/${id}`
    return this.http.get(url)
    .pipe(catchError((error) => this.handleErrors(error)));
  }

  public updateTask(task: Task): Observable<any> {
    let url = `${this.tasksUrl}/${task.id}`;
    let body = JSON.stringify(task);
    let headers = new HttpHeaders({'Content-type': 'application/json'});

    return this.http.put(url, body, { headers: headers })
      .pipe(catchError((error) => this.handleErrors(error)))
  }

  private handleErrors(handleError: any) {
    console.error("Salvando o Erro num arquivo de log - Detalhes do erro => ", handleError);
    return of(handleError);
  }
}
