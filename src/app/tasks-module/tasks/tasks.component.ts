import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  taskItem: string[] = [];
  userInput = document.getElementById('tasksInput');
  addBtn = document.getElementById('addBtn');

  constructor() {
    this.addTask();
  }

  ngOnInit(): void {

  }

  addTask(){

  }

}
