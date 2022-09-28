import {HttpHeaderResponse, HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError } from "rxjs";
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { Task } from "./task.model";

@Injectable()

export class TaskService{
  search(term: string): any {
    throw new Error("Method not implemented.");
  }
  public tasksUrl = "http://localhost:4000/tasks"
  public headers = new HttpHeaders({'Content-Type': 'application/json'});

  public constructor(private http: HttpClient) {}
  
  public getAll(): Observable<Task[] | undefined>{
    return this.http.get(this.tasksUrl)
    .pipe(map((response: any) => response as Task[])) 
    .pipe(catchError(this.handleErrors));
  }
  
  public getImportant(): Observable<Task[] | undefined>{
    return this.getAll()
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

  public create(task: Task): Observable<Task> {
    let url = this.tasksUrl;

    return this.http.post(url, task)
      .pipe(
        catchError(this.handleErrors),
        map((response: any) => response as Task)
      )
  }

  public update(task: Task): Observable<Task> {
    let url = `${this.tasksUrl}/${task.id}`;

    return this.http.patch(url, task, {headers: this.headers})
      .pipe(
        map(() => task),
        catchError(this.handleErrors)
      )
  }

  public delete(id: number): Observable<null> {
    let url = `${this.tasksUrl}/${id}`;

    return this.http.delete(url, { headers: this.headers})
      .pipe(
        catchError(this.handleErrors),
        map(() => null!)
      )
  }
  // public searchByTitle(term: string): Observable<Task[]> {
  //   let url = `${this.tasksUrl}?title=${term}`;

  //   return this.http.get(url)
  //     .pipe(
  //       catchError(this.handleErrors),
  //       map((response: any) => response.json as Task[])
  //     )
  // }

  private handleErrors(error: any) {

    console.log("Salvando o Erro num arquivo de log - Detalhes do erro =>", error)

    return throwError(error || 'server Error');

  }
}