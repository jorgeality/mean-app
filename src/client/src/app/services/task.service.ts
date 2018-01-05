import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //esto es lo que no va ayudar a pedir datos. y tambiendebe ser imprtado en el appmodule
import "rxjs/add/operator/map"

import { Task } from '../Task';

@Injectable()
export class TaskService {
  domain: string = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  getTasks(){
    //`${this.domain}/`, mejor conocido como interpolacion
    //.map nos ayudara a obteenr un observable, que se debe importar desde la libreria rxjs. me dara una respuesta que yo despues dare a quien utilize este metodo
    //este metod get debe retornar algo, lo cual sera un arreglo de tareas
    return this.http.get<Task[]>(`${this.domain}/api/tasks`)
    .map(res => res);
  }
  addTasks(newTask: Task)
  {

    return this.http.post(`${this.domain}/api/tasks`, newTask)
    .map(res => res);
  }

  deleteTasks(id){

    return this.http.delete(`${this.domain}/api/tasks/${id}`)
    .map(res => res); 

  }
  updateTasks(newTask){
    return this.http.put(`${this.domain}/api/tasks/${newTask.id}`, newTask)
    .map(res => res); 

  }
}
