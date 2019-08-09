import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { FormControl } from '@angular/forms';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  toDoListArray: Array<any>;
  textSearch: FormControl;
  dateSearch: FormControl;
  textSortArrow:string;
  dateSortArrow: string;

  @Output() filtersData: EventEmitter<any> = new EventEmitter();

  constructor(private toDoService:TodoService, private dateParserFormatter:NgbDateParserFormatter) {}

  sortText() {
    if(this.textSortArrow === "↑"){
      this.textSortArrow = "↓";
      return this.filtersData.emit(this.toDoService.sortText());
    }
    if(this.textSortArrow === "↓"){
      this.textSortArrow = "↑";
      return this.filtersData.emit(this.toDoService.sortText().reverse());
    }
    this.textSortArrow = "↓";
    return this.filtersData.emit(this.toDoService.sortText());
  }

  sortDate() {
    if(this.dateSortArrow === "↑"){
      this.dateSortArrow = "↓";
      return this.filtersData.emit(this.toDoService.sortDate());
    }
    if(this.dateSortArrow === "↓"){
      this.dateSortArrow = "↑";
      return this.filtersData.emit(this.toDoService.sortDate().reverse());
    }
    this.dateSortArrow = "↓";
    return this.filtersData.emit(this.toDoService.sortDate());
  }

  ngOnInit() {
    this.textSearch = new FormControl;
    this.dateSearch = new FormControl;

    this.textSearch.valueChanges.subscribe(value => {
      this.filtersData.emit(this.toDoService.commonSearch({
        name:value,
        date: this.dateParserFormatter.format(this.dateSearch.value)
      }));
    })
    this.dateSearch.valueChanges.subscribe(value => {
      return this.filtersData.emit(this.toDoService.commonSearch({
        name: this.textSearch.value,
        date: this.dateParserFormatter.format(value)
      }));
    });
  }
}
