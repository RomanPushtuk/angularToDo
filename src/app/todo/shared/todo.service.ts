import { Injectable } from '@angular/core';
import { todo } from '../interfaces/todo'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  toDoList: Array<any>;
  constructor() {}

  generateId():string {
    return `_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  getIndexInToDo(id:string) {
    return this.toDoList.findIndex(item => {
      return item.id === id;
    });
  }

  getToDoList():Array<todo> {
    if (!JSON.parse(localStorage.getItem("add-to-storage"))){
      return this.toDoList = []
    }
    return this.toDoList = JSON.parse(localStorage.getItem("add-to-storage"));
  }

  saveToDoList(data:Array<todo>) {
      localStorage.setItem("add-to-storage", JSON.stringify(data));
  }

  changeData(id:string, text:string, data: string):Array<todo> {
    const index = this.getIndexInToDo(id);
    this.toDoList[index].text = text;
    this.toDoList[index].data = data;
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }

  addToDo(text:string, date:string):Array<todo> {
    this.toDoList.push({
      id: this.generateId(),
      check: false,
      text: text,
      date: date,
    });
    console.log(this.toDoList);
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }

  checkOnToDo(id:string, flag:boolean) {
    const index = this.getIndexInToDo(id);
    this.toDoList[index].check = flag;
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }

  removeToDo(id:string):Array<todo> {
    this.toDoList.forEach((item, i) => {
      if (item.id === id) {
        this.toDoList.splice(i, 1);
      }
    });
    this.saveToDoList(this.toDoList);
    return this.toDoList;
  }
}
