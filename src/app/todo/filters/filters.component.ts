import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import ITodo from '../interfaces/ITodo';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnInit, OnDestroy {
  toDoListArray: Array<ITodo>;
  textSearch: FormControl;
  dateSearch: FormControl;
  textSortArrow: string = '↓';
  dateSortArrow: string = '↓';
  textSortSubscribe: Subscription;
  dateSortSubscribe: Subscription;

  @Output() filtersData: EventEmitter<Array<ITodo>> = new EventEmitter();

  constructor(
    private toDoService: TodoService,
    private dateParserFormatter: NgbDateParserFormatter
  ) {}

  sortText() {
    if (this.textSortArrow === '↑') {
      this.textSortArrow = '↓';
      return this.filtersData.emit(this.toDoService.sortText());
    }
    if (this.textSortArrow === '↓') {
      this.textSortArrow = '↑';
      return this.filtersData.emit(this.toDoService.sortText().reverse());
    }
  }

  sortDate() {
    if (this.dateSortArrow === '↑') {
      this.dateSortArrow = '↓';
      return this.filtersData.emit(this.toDoService.sortDate());
    }
    if (this.dateSortArrow === '↓') {
      this.dateSortArrow = '↑';
      return this.filtersData.emit(this.toDoService.sortDate().reverse());
    }
  }

  ngOnInit() {
    this.textSearch = new FormControl();
    this.dateSearch = new FormControl();

    this.textSortSubscribe = this.textSearch.valueChanges.subscribe(value => {
      const obj = {
        name: value,
        date: this.dateParserFormatter.format(this.dateSearch.value),
      };
      this.filtersData.emit(this.toDoService.commonSearch(obj));
    });

    this.dateSortSubscribe = this.dateSearch.valueChanges.subscribe(value => {
      const obj = {
        name: this.textSearch.value,
        date: this.dateParserFormatter.format(value),
      };
      return this.filtersData.emit(this.toDoService.commonSearch(obj));
    });
  }

  ngOnDestroy() {
    this.textSortSubscribe.unsubscribe();
    this.dateSortSubscribe.unsubscribe();
  }
}
