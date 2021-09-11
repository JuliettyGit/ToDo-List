import {Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertModalDialogComponent } from "../alert-modal-dialog/alert-modal-dialog.component";
import { ITaskItem } from "../../interfaces/ITaskItem";

@Component(
  {
  selector: 'app-modal-dialog',
  templateUrl: './edit-modal-dialog.component.html',
  styleUrls: ['./edit-modal-dialog.component.css']
  })
export class EditModalDialogComponent implements OnInit
{

  constructor(public dialogRef: MatDialogRef<EditModalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ITaskItem,
              public dialog: MatDialog) {}

  ngOnInit(): void {}

  writeStatus(event: string)
  {
    this.data.taskStatus = event;
  }

  getDeadline(event: Date)
  {
    this.data.deadline = event;
  }

  close(): void
  {
    this.dialogRef.close();
  }

  save()
  {
    if(this.data.taskText !== '')
    {
      this.dialogRef.close(
        { taskText: this.data.taskText,
          taskStatus: this.data.taskStatus,
        taskDetails: this.data.taskDetails,
        deadline: this.data.deadline});
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
      data: { alertText: alertText }
    });
  }

}
