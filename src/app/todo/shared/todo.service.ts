import { Injectable } from '@angular/core';
import ITodo from '../interfaces/ITodo';

import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class TodoService {
  toDoList: Array<ITodo>;
  toDoListFilter: Array<ITodo>;

  constructor(private ngbDateParserFormatter: NgbDateParserFormatter) {}

  generateId(): string {
    return `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  getIndexInToDo(id: string) {
    return this.toDoList.findIndex(item => item.id === id);
  }

  getToDoList(): Array<ITodo> {
    if (!JSON.parse(localStorage.getItem('add-to-storage'))) {
      return (this.toDoList = []);
    }
    this.toDoList = JSON.parse(localStorage.getItem('add-to-storage'));
    this.toDoListFilter = this.toDoList;
    return this.toDoList;
  }

  saveToDoList(data: Array<ITodo>) {
    localStorage.setItem('add-to-storage', JSON.stringify(data));
  }

  changeData({ id, text, date }): Array<ITodo> {
    const index = this.getIndexInToDo(id);
    this.toDoList[index].text = text;
    this.toDoList[index].date = date;
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }

  addToDo(text: string, date: string): Array<ITodo> {
    this.toDoList.push({
      text,
      date,
      check: false,
      id: this.generateId(),
    });
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }

  checkOnToDo(id: string, flag: boolean): Array<ITodo> {
    const index = this.getIndexInToDo(id);
    this.toDoList[index].check = !flag;
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }

  removeToDo(id: string): Array<ITodo> {
    this.toDoList.forEach((item, i) => {
      if (item.id === id) {
        this.toDoList.splice(i, 1);
      }
    });
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }

  searchObjs(arr: Array<ITodo>, target: string, text: string) {
    if (!text) {
      return arr;
    }
    return arr.filter(item => {
      if (item[target].match(`^${text}`)) {
        return true;
      }
    });
  }

  sortText(): Array<ITodo> {
    return this.toDoListFilter.sort((a, b) => {
      const nameA = a.text.toLowerCase();
      const nameB = b.text.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  sortDate(): Array<ITodo> {
    let date: Array<any> = [...this.toDoListFilter];
    date.forEach(item => {
      item.date = this.ngbDateParserFormatter.parse(item.date);
      item.dateNumber = item.date.year * 100 + item.date.month * 10 + item.date.day;
    });

    date.sort((a, b) => {
      // return a.dateNumber < b.dateNumber ? -1 : a.dateNumber > b.dateNumber ? 1 : 0;
      if (a.dateNumber < b.dateNumber) return -1;
      if (a.dateNumber > b.dateNumber) return 1;
      return 0;
    });

    date.forEach(item => {
      item.date = this.ngbDateParserFormatter.format(item.date);
    });

    this.toDoListFilter = date;
    return this.toDoListFilter;
  }

  commonSearch({ name, date }): Array<ITodo> {
    const filter = this.searchObjs(this.toDoList, 'text', name);
    this.toDoListFilter = this.searchObjs(filter, 'date', date);
    return this.toDoListFilter;
  }
}
