import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; //esto es lo que no va ayudar a pedir datos.
import { FormsModule  } from '@angular/forms';//esto es lo que permite usar el ngModel

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { TaskService } from './services/task.service';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule//ngmodel
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }