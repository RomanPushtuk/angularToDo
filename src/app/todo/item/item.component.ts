import { Component, OnInit, Input } from '@angular/core';
import ITodo from '../interfaces/ITodo';
import { TodoService } from '../shared/todo.service';
import { FormControl } from '@angular/forms';
import { NgbDateParserFormatter, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  id:string;
  textChange: FormControl;
  dateChange: FormControl;
  @Input() toDoListArray: Array<ITodo>;

  constructor(
    private toDoService:TodoService,
    private dateParserFormatter:NgbDateParserFormatter,
    private modalService: NgbModal,
   ) { }

  ngOnInit() {
    this.textChange = new FormControl();
    this.dateChange = new FormControl();
  }

  handlerChangeData(id:string ,text:string, date:string, content:any) {
    this.id = id;
    this.textChange.setValue(text);
    const dateNgb = this.dateParserFormatter.parse(date);
    this.dateChange.setValue(dateNgb);
    this.modalService.open(content);
  }

  changeData() {
    const dateString = this.dateParserFormatter.format(this.dateChange.value);
    const obj = {
      id: this.id,
      date: dateString,
      text: this.textChange.value,
    }
    this.toDoService.changeData(obj);
  }

  // Меняет отметку ВЫПОЛНЕНО\НЕВЫПОЛНЕНО
  alterCheck(id: string, check:boolean){
    this.toDoService.checkOnToDo(id, check);
  }

  // Удаляем элемент
  deleteDoTo(id:string){
    this.toDoService.removeToDo(id);
  }

}
