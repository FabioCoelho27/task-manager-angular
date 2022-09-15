import { Injectable } from "@angular/core";

import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Observable } from "rxjs";
import { Task } from "./tasks/shared/task.model";

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
      { id: 5, title: 'Watching leason about Angular', deadline: '14-09-2022', description: 'routes'},
      { id: 6, title: 'Buy a pizza'},
      { id: 7, title: 'Leave my daughter to school'}
    ];
    return { tasks }
  }
  genId(tasks: Task[]): number {
    // retorna apenas o id dos heroes: [11, 12, 13, 14, 15, 16]
    const taskIds = tasks.map((task) => task.id);

    // retorna o maior valor dos heroIds: Math.max(11, 12, 13, 14, 15, 16)
    const maxId = Math.max(...taskIds);

    // incrementa o maxId ou retorna 1 caso nao tenha heroes no array
    const nextId = tasks && tasks.length > 0 ? maxId + 1 : 1;

    return nextId;
  }
  
}