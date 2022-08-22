import {HttpHeaderResponse, HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { Task } from "./task.model";

@Injectable()

export class TaskService{
  public tasksUrl = "api/tasks"

  public constructor(private http: HttpClient) {}
  
  public getTasks(): Observable<Task[] | undefined>{
    return this.http.get(this.tasksUrl)
    .pipe(map((response: any) => response as Task[])) 
    .pipe(catchError(this.handleErrors));
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
    .pipe(catchError(this.handleErrors));
  }
  public getById(id: number): Observable<Task | undefined> {
    let url = `${this.tasksUrl}/${id}`
    return this.http.get(url)
    .pipe(map((response: any) => response as Task)) 
    .pipe(catchError(this.handleErrors));
  }

  public createTask(task: Task): Observable<Task> {
    let url = this.tasksUrl;
    let body = JSON.stringify(task);
    let headers = new HttpHeaders({'Content-type': 'application/json'})

    return this.http.post(url, body, { headers: headers })
    .pipe(
      catchError(this.handleErrors),
      map((response: any) => response as Task)
    )
  }
  

  public updateTask(task: Task): Observable<any> {
    let url = `${this.tasksUrl}/${task.id}`
    let body = JSON.stringify(task)
    let headers = new HttpHeaders({'Content-type': 'application/json'})

    return this.http.put(url,body, {headers: headers})
      .pipe(
        catchError(this.handleErrors),
        map((response) => {
        console.log(response);
        return response;
       })
      )
  }

  private handleErrors(handleErros: Response) {
    console.log("Salvando o Erro num arquivo de log - Detalhes do erro =>", Error)
    return throwError(Error || 'server Error');
  }
}