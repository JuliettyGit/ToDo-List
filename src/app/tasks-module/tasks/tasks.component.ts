import {Component, OnInit} from '@angular/core';
import { EditModalDialogComponent } from '../edit-modal-dialog/edit-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent} from '../delete-modal-dialog/delete-modal-dialog.component';
import { AlertModalDialogComponent } from '../alert-modal-dialog/alert-modal-dialog.component';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit {
  taskItems: string[] = [];
  taskInput: string = '';

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  addTask(){
    if(this.taskInput === '')
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }
    else if(!this.taskItems.includes(this.taskInput)){
      this.taskItems.push(this.taskInput);

    }
    else {
      const alertText = "This task has already created";
      this.openAlertDialog(alertText);
    }
    console.log(this.taskItems);
    return this.taskItems;
  }

  editTask(i: number, result: string){
    this.taskItems.splice(i, 1, result)

    console.log(this.taskItems)
  }

  deleteTask(i: number)
  {
      this.taskItems.splice(i, 1);
      console.log(this.taskItems);
  }

  openEditDialog(i: number) {
    const dialogRef = this.dialog.open(EditModalDialogComponent, {
      data: {task: this.taskItems[i]}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== this.taskItems[i] && result)
      {
        this.editTask(i, result);
      }
    });
  }

  openDeleteDialog(i: number) {
   const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
       data: {task: this.taskItems[i]}
    });
    dialogRef.afterClosed().subscribe(result =>{
      if(result == undefined)
      {
        console.log(result)
        this.deleteTask(i);
      }
    })
  }

  openAlertDialog(alertText: string){
    this.dialog.open(AlertModalDialogComponent, {
      data: {alertText: alertText}
    });
  }

}
