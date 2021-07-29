import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  taskItems: string[] = [];
  taskInput: string = '';
  task: string = '';

  constructor() {

  }

  ngOnInit(): void {

  }

  addTask(){
    if(!this.taskItems.includes(this.taskInput)){
      this.taskItems.push(this.taskInput);
    }
    else alert("This task has already created");
    console.log(this.taskItems);
    return this.taskItems;
  }

  setEditForm(i: number){
    let changedTask = prompt('Change your task', this.taskItems[i]);
    if (typeof changedTask === "string") {
      this.taskItems.splice(i, 1, changedTask);
    }

    console.log(this.taskItems)
  }

  deleteElement(i: number)
  {
      this.taskItems.splice(i, 1);
      console.log(this.taskItems);
  }

}
