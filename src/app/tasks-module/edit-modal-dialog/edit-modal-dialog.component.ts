import { Component, OnInit } from '@angular/core';
// import {TasksComponent} from '../tasks/tasks.component';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './edit-modal-dialog.component.html',
  styleUrls: ['./edit-modal-dialog.component.css']
})
export class EditModalDialogComponent implements OnInit {
  changingTask: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  save(){

  }
}
