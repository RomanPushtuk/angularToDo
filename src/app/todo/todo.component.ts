import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {
  toDoListArray:Array<any>;

  constructor(
    private toDoService:TodoService,
   ) { }

  // После того как компонент создан инициируем переменные и поля ввода
  ngOnInit() {
    this.toDoListArray = this.toDoService.getToDoList();
  }
}
