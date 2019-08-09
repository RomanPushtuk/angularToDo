import { Component, OnInit, Input } from '@angular/core';
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
  textValid: boolean;
  dateValid: boolean;
  textChange: FormControl;
  dateChange: FormControl;
  @Input() toDoListArray: Array<any>;

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
    this.dateChange.setValue(this.dateParserFormatter.parse(date));
    this.modalService.open(content);
  }

  changeData() {
    this.toDoService.changeData(this.id, this.textChange.value, this.dateParserFormatter.format(this.dateChange.value));
  }

  // Меняет отметку ВЫПОЛНЕНО\НЕВЫПОЛНЕНО
  alterCheck(id: string, check:boolean){
    this.toDoService.checkOnToDo(id, !check);
  }

  // Удаляем элемент
  deleteDoTo(id:string){
    this.toDoService.removeToDo(id);
  }

}
