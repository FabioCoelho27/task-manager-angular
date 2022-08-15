import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import { switchMap } from 'rxjs/operators';

import { Task } from "../shared/task.model";
import { TaskService } from "../shared/task.service";

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit{
  public task: Task;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ){
    this.task = {};
  }

  public ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(
        (params: Params) => this.taskService.getTask(+params['id'])
      )
    )
    .subscribe({
      next: (task) => {
        this.task = task;
      },
      error: () => alert("Ocorreu um erro no servidor, por favor tente mais tarde.")
    })
  }

  public goBack(){
    this.location.back();
  }

  public updateTask(){
    if(!this.task.title) {
      alert("A tarefa deve ter um título.");
    } else {
      this.taskService.updateTask(this.task)
      .subscribe({
        next: (res) => {
          console.log('resposta: \n', res);
          console.log('this.task: \n', this.task);
          alert("Tarefa atualizada com sucesso");
        },
        error: () => alert("Occoreu um erro no servidor, só entro no segundo alert")
      })
    }
  }
}


