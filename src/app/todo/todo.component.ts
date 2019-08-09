import { Component, OnInit } from '@angular/core';
import { TodoService } from './shared/todo.service';
import { FormControl , FormGroup, Validators } from '@angular/forms';

import { NgbDate, NgbDateParserFormatter, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService],
})
export class TodoComponent implements OnInit {
  id:string;
  text: FormControl;
  date: FormControl;
  textValid: boolean;
  dateValid: boolean;
  textChange: FormControl;
  dateChange: FormControl;
  textSearch: FormControl;
  dateSearch: FormControl;
  toDoListArray:Array<any>;
  fullData: FormGroup;
  textSortArrow:string;
  dateSortArrow: string;

  constructor(
    private toDoService:TodoService,
    private dateParserFormatter:NgbDateParserFormatter,
    private modalService: NgbModal,
   ) { }
  //
  handlerChangeData(id:string ,text:string, date:string, content) {
    this.id = id;
    this.textChange.setValue(text);
    this.dateChange.setValue(this.dateParserFormatter.parse(date));
    this.modalService.open(content);
  }

  changeData() {
    console.log(this.id, this.textChange.value, this.dateParserFormatter.format(this.dateChange.value))
    this.toDoListArray = this.toDoService.changeData(this.id, this.textChange.value, this.dateParserFormatter.format(this.dateChange.value));
  }

  // Добавляем данные
  onAdd() {
    if (!this.textValid && !this.dateValid){
      this.toDoListArray = this.toDoService.addToDo(this.text.value, this.dateParserFormatter.format(this.date.value));
      this.text.setValue("");
      this.date.setValue("");
      this.textValid = false;
      this.dateValid = false;
    }
  }


  // Меняет отметку ВЫПОЛНЕНО\НЕВЫПОЛНЕНО
  alterCheck(id: string, check:boolean){
    this.toDoListArray = this.toDoService.checkOnToDo(id, !check);
  }

  sortText() {
    if(this.textSortArrow === "↑"){
      this.textSortArrow = "↓";
      return this.toDoListArray = this.toDoService.sortText();
    }
    if(this.textSortArrow === "↓"){
      this.textSortArrow = "↑";
      return this.toDoListArray = this.toDoService.sortText().reverse();
    }
    this.textSortArrow = "↓";
    return this.toDoListArray = this.toDoService.sortText();
  }

  sortDate() {
    if(this.dateSortArrow === "↑"){
      this.dateSortArrow = "↓";
      return this.toDoListArray = this.toDoService.sortDate();
    }
    if(this.dateSortArrow === "↓"){
      this.dateSortArrow = "↑";
      return this.toDoListArray = this.toDoService.sortDate().reverse();
    }
    this.dateSortArrow = "↓";
    return this.toDoListArray = this.toDoService.sortDate();
  }

  // После того как компонент создан инициируем переменные и поля ввода
  ngOnInit() {
    this.toDoListArray = this.toDoService.getToDoList();
    this.textValid = true;
    this.dateValid = true;
    this.text = new FormControl("", Validators.required);
    this.text.statusChanges.subscribe(value => {
      if(value === "INVALID"){
        this.textValid = true;
      }else{
        this.textValid = false;
      }
    })
    this.date = new FormControl(null, [validDate, Validators.required ]);
    this.date.statusChanges.subscribe(value => {
      if(value === "INVALID"){
        this.dateValid = true;
      }else{
        this.dateValid = false;
      }
    })
    this.dateChange = new FormControl();
    this.textChange = new FormControl();

    this.textSearch = new FormControl();
    this.textSearch.valueChanges.subscribe(value => {
      this.toDoListArray = this.toDoService.commonSearch({name:value, date: this.dateParserFormatter.format(this.dateSearch.value)});
    })
    this.dateSearch = new FormControl();
    this.dateSearch.valueChanges.subscribe(value => {
      this.toDoListArray = this.toDoService.commonSearch({name: this.textSearch.value, date: this.dateParserFormatter.format(value)});
    });

    this.textSortArrow = "";
    this.dateSortArrow = "";
  }

  // Удаляем элемент
  deleteDoTo(id:string){
    this.toDoListArray = this.toDoService.removeToDo(id);
  }

}

function validDate(formControl:FormControl) {
  if (formControl.value instanceof NgbDate){
    return new Error;
  }
  return null;
}
