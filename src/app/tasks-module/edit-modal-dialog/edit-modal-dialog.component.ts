import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Task } from "../tasks/task";
import { AlertModalDialogComponent } from "../alert-modal-dialog/alert-modal-dialog.component";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './edit-modal-dialog.component.html',
  styleUrls: ['./edit-modal-dialog.component.css']
})
export class EditModalDialogComponent implements OnInit
{

  constructor(public dialogRef: MatDialogRef<EditModalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task,
              public dialog: MatDialog) {}

  status: string = this.data.taskStatus;

  ngOnInit(): void {}

  writeStatus(event: string)
  {
    this.status = event;
  }

  close(): void
  {
    this.dialogRef.close();
  }

  save()
  {
    if(this.data.taskText !== ''){
      this.dialogRef.close( {taskText: this.data.taskText, taskStatus: this.status});
      console.log(this.status)
    }
    else
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }
  }

  openAlertDialog(alertText: string)
  {
    this.dialog.open(AlertModalDialogComponent, {
      data: {alertText: alertText}
    });
  }

}
