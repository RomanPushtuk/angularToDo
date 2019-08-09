import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { FormControl, Validators } from '@angular/forms';

import { NgbDate, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.scss']
})
export class InputsComponent implements OnInit {
  text: FormControl;
  date: FormControl;
  textValid:boolean;
  dateValid:boolean;

  @Output() dataInputs:EventEmitter<any> = new EventEmitter();

  constructor(private toDoService:TodoService, private dateParserFormatter:NgbDateParserFormatter) { }

  // Добавляем данные
  onAdd() {
    if (!this.textValid && !this.dateValid){
      this.dataInputs.emit(this.toDoService.addToDo(this.text.value, this.dateParserFormatter.format(this.date.value)));
      this.text.setValue("");
      this.date.setValue("");
      this.textValid = false;
      this.dateValid = false;
    }
  }

  ngOnInit() {
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
  }
}

function validDate(formControl:FormControl) {
  if (formControl.value instanceof NgbDate){
    return new Error;
  }
  return null;
}
