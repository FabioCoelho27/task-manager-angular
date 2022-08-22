import { Component, OnInit } from "@angular/core";

import { Task } from "./shared/task.model";
import { TaskService } from "./shared/task.service";



@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
})


export class TasksComponent implements OnInit{
  public tasks: Array<Task> | undefined;
  public newTask: Task;

  // public selectedTask!: Task
  //private taskService: TaskService
  
  public constructor(private taskService: TaskService){
    this.newTask = new Task(null!, '')
  }

  public ngOnInit() {
   this.taskService.getTasks()
    .subscribe(
      tasks => this.tasks = tasks,
      error => alert("Ocorreu um erro no servidor.")
    )
  }

  public createTask(){
    this.newTask.title = this.newTask.title.trim();
    if(!this.newTask.title){
      alert("A tarefa deve ter um título")
    }else{
      this.taskService.createTask(this.newTask)
      .subscribe(
        (task) =>{
          this.tasks?.push(task);
          this.newTask = new Task(null!, '') //zerar o campo depois de criar uma nova tarefa.
        },
        () => alert("Ocorreu um erro no servidor.")
      )
    }
  }

  public deleteTask(task: Task){
    if(confirm(`Deseja realmente excluir a tarefa "${task.title}`)){
      this.taskService.deleteTask(task.id)
      .subscribe(
        () => this.tasks = this.tasks?.filter(t => t !== task),
        () => alert("Ocorreu um erro no servidor")
      )
    }
  }

}