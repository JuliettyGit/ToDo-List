import { Component, OnInit, Input } from '@angular/core';
import { ITaskItem } from "../../../shared/interfaces/ITaskItem";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Task} from "../../../tasks-module/tasks/task";

@Component({
  selector: 'appToDoList-UI',
  templateUrl: './toDoList-UI.html',
  styleUrls: ['./toDoList-UI.css']
})
export class ToDoListUI implements OnInit {

  @Input()
  taskList: ITaskItem[] | null  = [];

  constructor() { }

  ngOnInit(): void {}


  console()
  {
    console.log(this.taskList)
  }

  drop(event: CdkDragDrop<ITaskItem[]>): void
  {
    if (event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    else
    {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
