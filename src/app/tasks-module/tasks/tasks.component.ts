import { Component, OnInit } from '@angular/core';
import { EditModalDialogComponent } from '../edit-modal-dialog/edit-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent} from '../delete-modal-dialog/delete-modal-dialog.component';
import { AlertModalDialogComponent } from '../alert-modal-dialog/alert-modal-dialog.component';
import { Task } from './task';
import { filter } from "rxjs/operators";
import { OptionListComponent } from 'src/app/option-list/option-list.component'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit {
  taskItems: Array<Task> = [];
  taskInput: string = '';

  optionList = new OptionListComponent();

  constructor(public dialog: MatDialog)
{

}

  ngOnInit(): void {

  }

  addTask(){
    let newTask: { taskText: string;  taskStatus: string} = {
      taskText: this.taskInput.trim(),
      taskStatus: this.optionList.selectedValue
    }

    if(newTask.taskText === '')
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }

    else if(!this.taskItems.find((item)=> newTask.taskText === item.taskText))
    {
      if(this.optionList.selectedValue === ""){
        this.optionList.selectedValue = this.optionList.taskStatuses[0].status;
      }
      else {
        this.taskItems.push(<Task>newTask);
        console.log(this.taskItems)
      }
    }

    else {
      const alertText = "This task has already created";
      this.openAlertDialog(alertText);
    }

    return this.taskItems;
  }

  editTask(i: number, result: Task){
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
      data: {taskText: this.taskItems[i].taskText, taskStatus: this.taskItems[i].taskStatus}
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!this.taskItems[i] && res))
      .subscribe(result => {
        this.editTask(i, result);
    });
  }

  openDeleteDialog(i: number) {
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      data: {taskText: this.taskItems[i].taskText}
    });

    dialogRef.backdropClick()
      .subscribe(() => {
        dialogRef.close();
        console.log(this.taskItems);
      });

    dialogRef.afterClosed()
      .pipe(filter(res => !!res))
      .subscribe(() => this.deleteTask(i));
  }

  openAlertDialog(alertText: string){
    this.dialog.open(AlertModalDialogComponent, {
      data: { alertText: alertText }
    });
  }

}
