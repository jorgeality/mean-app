import { BrowserModule } from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';

//importando servicios, de igual manera los debemos incluir en los providers
import {TasksService} from './services/tasks.service';

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot() // <-- Esta línea también la añadimos
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
