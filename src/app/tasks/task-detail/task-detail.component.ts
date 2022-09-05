import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";
import  { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms";

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
  public taskDoneOptions: Array<any>;;

  public constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder
  ){ 
    this.taskDoneOptions = [{value: false, text: "Pendente"},
    {value: true, text: "Feita"}];


    this.reactiveTaskForm = this.formBuilder.group({
      id: [null],
      title: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(255)]],
      deadline: [null, Validators.required],
      done: [null],
      description: [null]
    })
  }


  public ngOnInit(){
    this.task = new Task(null!, null! )

    this.route.params
    .pipe(switchMap((params: Params) =>  this.taskService.getById(+params['id'])))
    .subscribe(
      task => this.setTask(task as Task),
      Error => alert("Ocorreu um erro no servidor, por favor tente mais tarde.")
      )
    
  }
  public setTask(task: Task | undefined): void{
    this.task = task;

    // setValue
    let formModel ={
      title: task!.title || null,
      deadline: task!.deadline || null,
      description: task!.description || null,
      done: task!.done || null
    }
    this.reactiveTaskForm.setValue(formModel);
  }

  ngAfterViewInit() {
    
  }

  public goBack(){
    this.location.back();
  }

  public update(){
    if(this.task!.title){
      alert("A tarefa deve ter um título")
    }else{
      this.taskService.update(this.task!)
      .subscribe(
        () => alert("Tarefa atualizada com sucesso"),
        () => alert("Occoreu um erro no servidor, só entro no segundo alert")
      )
    }
  }

  // form errors methods
  public fieldClassForErrorOrSuccess(fieldName: string){
    return {
      "has-error": this.showFieldError(this.reactiveTaskForm.get(fieldName)),
      "has-success": this.reactiveTaskForm.get(fieldName)?.valid
    }
  }
  public iconClassErrorOrSuccess(fieldName: string){
    return {
      "bi bi-x": this.showFieldError(this.reactiveTaskForm.get(fieldName)),
      "bi-check2": this.reactiveTaskForm.get(fieldName)?.valid
    }
  }

  public showFieldError(field: AbstractControl<any, any> | null): boolean{
    return field!.invalid && (field!.touched || field!.dirty);
  }

  public getField(fieldName: string){
    return this.reactiveTaskForm.get(fieldName);
  }
}


