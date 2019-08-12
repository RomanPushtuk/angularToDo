import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoService } from '../shared/todo.service';
import { FormControl, Validators } from '@angular/forms';

import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit, OnDestroy  {
  text: FormControl;
  date: FormControl;
  textValid:boolean = true;
  dateValid:boolean = true;
  textSubscribe: Subscription;
  dateSubscribe: Subscription;

  @Output() dataInputs:EventEmitter<any> = new EventEmitter();

  constructor(
    private toDoService:TodoService,
    private dateParserFormatter:NgbDateParserFormatter
  ) { }

  // Добавляем данные
  onAdd() {
    if (!this.textValid && !this.dateValid){
      const dateString = this.dateParserFormatter.format(this.date.value);
      const toDoListArray = this.toDoService.addToDo(this.text.value, dateString)
      this.dataInputs.emit(toDoListArray);
      this.text.setValue("");
      this.date.setValue("");
    }
  }

  ngOnInit() {
    // -----------------------------Валидаторы ввода текста
    this.text = new FormControl("", Validators.required);
    this.textSubscribe = this.text.statusChanges.subscribe(value => {
      this.textValid = value === "INVALID" ? true : false;
    })
    // -------------------------------Валидаторы ввода даты.
    this.date = new FormControl(null, [validDate, Validators.required ]);
    this.dateSubscribe = this.date.statusChanges.subscribe(value => {
      this.dateValid = value === "INVALID" ? true : false;
    })
  }

   ngOnDestroy() {
     this.textSubscribe.unsubscribe();
     this.dateSubscribe.unsubscribe();
   }
}

function validDate(formControl:FormControl) {
  if (formControl.value instanceof NgbDate){
    return new Error;
  }
  return null;
}
