import { Component, OnInit } from '@angular/core';

import { Task } from '../../task';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  constructor(private taskService: TaskService) { 
    //getTask devuelve algo, y ese algo lo mostrara con el metodo suscribe
    //luego lo almacenamos en el vector de tareas que esta declarado alla arriba.
    this.taskService.getTasks()
    .subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnInit() {
  }

}
