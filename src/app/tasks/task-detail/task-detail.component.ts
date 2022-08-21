import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import  { FormGroup, FormControl } from "@angular/forms";

import { from, Observable } from "rxjs";
import { switchMap } from 'rxjs/operators';

import { Task } from "../shared/task.model";
import { TaskService } from "../shared/task.service";

@Component({
  selector: 'task-detail',
  templateUrl: './task-detail.component.html'
})

export class TaskDetailComponent implements OnInit, AfterViewInit{
  public reactiveTaskForm: FormGroup;

  public task: Task | undefined;
  public taskDoneOptions: Array<any> = [
    {value: false, text: "Pendente"},
    {value: true, text: "Feita"}
  ]

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location
  ){ 
    this.reactiveTaskForm = new FormGroup({
      id: new FormControl(null),
      title: new FormControl(null),
      deadline: new FormControl(null),
      done: new FormControl(null),
      description: new FormControl(null)
    })
  }


  public ngOnInit(){
    this.task = new Task(null, null )

    this.route.params
    .pipe(switchMap((params: Params) =>  this.taskService.getById(+params['id'])))
    .subscribe(
      task => this.setTask(task as Task),
      Error => alert("Ocorreu um erro no servidor, por favor tente mais tarde.")
      )
    
  }
  public setTask(task: Task): void{
    this.task = task;

    // setValue
    let formModel ={
      title: task.title || null,
      deadline: task.deadline || null,
      description: task.description || null,
      done: task.done || null
    }
    this.reactiveTaskForm.setValue(formModel);
  }

  ngAfterViewInit() {
    $("#exemplo").fadeOut(9999)
  }

  public goBack(){
    this.location.back();
  }

  public updateTask(){
    if(this.task!.title){
      alert("A tarefa deve ter um título")
    }else{
      this.taskService.updateTask(this.task!)
      .subscribe(
        () => alert("Tarefa atualizada com sucesso"),
        () => alert("Occoreu um erro no servidor, só entro no segundo alert")
      )
    }
  }
}


