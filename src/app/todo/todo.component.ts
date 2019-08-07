import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';

import { NgbDateStruct, NgbDate, NgbDateParserFormatter, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {
  id: string;
  date: string;
  text: string;
  toDoListArray:Array<any>;

  constructor(
    private toDoService:TodoService,
    private dateParserFormatter:NgbDateParserFormatter,
    private modalService: NgbModal
   ) { }

  handlerChangeData(id:string ,text:string, date:string, content) {
    this.id = id;
    this.text = text;
    this.date = date;
    this.modalService.open(content);
  }

  changeData(newText, newData) {
    this.toDoListArray = this.toDoService.changeData(this.id, newText, newData);
  }

  onAdd(input, data) {
    if (!input.value){
      return alert("Введите текст");
    }
    if (!this.date){
      return alert("Введите дату");
    }
    this.toDoListArray = this.toDoService.addToDo(input.value, this.date);
    console.log(this.toDoListArray);
    input.value = "";
    data.value = "";
  }

  onDateSelect(event:NgbDate) {
    this.date = this.dateParserFormatter.format(event);
  }

  alterCheck(id: string, check:boolean){
    this.toDoListArray = this.toDoService.checkOnToDo(id, !check);
    console.log(id, check);
  }

  ngOnInit() {
    this.toDoListArray = this.toDoService.getToDoList();
  }

  deleteDoTo(id:string){
    this.toDoListArray = this.toDoService.removeToDo(id);
  }

}
