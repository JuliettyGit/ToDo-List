import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Task} from "../tasks/task";


@Component({
  selector: 'app-modal-dialog',
  templateUrl: './edit-modal-dialog.component.html',
  styleUrls: ['./edit-modal-dialog.component.css']
})
export class EditModalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditModalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Task)
  { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  save()
  {
    this.dialogRef.close( {taskText: this.data.task});
  }

}
