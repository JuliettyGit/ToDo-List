import {Component, OnInit} from '@angular/core';
import { EditModalDialogComponent } from '../edit-modal-dialog/edit-modal-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { DeleteModalDialogComponent} from '../delete-modal-dialog/delete-modal-dialog.component';


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
      alert("Can't add blank field");
    }
    else if(!this.taskItems.includes(this.taskInput)){
      this.taskItems.push(this.taskInput);
    }
    else alert("This task has already created");
    console.log(this.taskItems);
    return this.taskItems;
  }

  setEditForm(i: number){
    this.openEditDialog()

    // let changedTask = prompt('Change your task', this.taskItems[i]);
    // if (typeof changedTask === "string") {
    //   this.taskItems.splice(i, 1, changedTask);
    // }

    console.log(this.taskItems)
  }

  deleteElement(i: number)
  {
      this.taskItems.splice(i, 1);
      console.log(this.taskItems);
  }

  openEditDialog() {
    this.dialog.open(EditModalDialogComponent);
  }

  openDeleteDialog(i: number) {
   const dialogRef = this.dialog.open(DeleteModalDialogComponent);
    dialogRef.afterClosed().subscribe(() =>{
      this.deleteElement(i);
    })
  }



}
