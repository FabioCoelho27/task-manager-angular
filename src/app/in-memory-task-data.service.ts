import { Injectable } from "@angular/core";

import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InMemoryTaskDataService implements InMemoryDbService{

constructor() { }
  public createDb(){
    let tasks = [
      { id: 1, title: 'Training English later wake up'},
      { id: 2, title: 'Pay the bill'},
      { id: 3, title: 'Pay the net'},
      { id: 4, title: 'Watching leason about Rails'},
      { id: 5, title: 'Watching leason about Angular'},
      { id: 6, title: 'Buy a pizza'},
      { id: 7, title: 'Leave my daughter to school'}
    ];
    return { tasks }
  }
  
}