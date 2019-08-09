import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { FiltersComponent } from './todo/filters/filters.component';
import { ItemComponent } from './todo/item/item.component';
import { InputsComponent } from './todo/inputs/inputs.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    FiltersComponent,
    ItemComponent,
    InputsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
