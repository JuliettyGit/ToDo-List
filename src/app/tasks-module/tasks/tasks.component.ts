import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  taskItems: string[] = [];
  taskInput: string = '';
  option: any;

  constructor() {
    this.addTask();
  }

  ngOnInit(): void {

  }

  addTask(){
    let task = this.taskInput;

    if(!this.taskItems.includes(task)){
      this.taskItems.push(task);
      this.option = ''
    }
    else alert("This task has already created");
    console.log(this.taskItems);
  }


}
