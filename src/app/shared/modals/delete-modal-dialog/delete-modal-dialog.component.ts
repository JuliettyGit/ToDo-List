import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ITaskItem } from "../../interfaces/ITaskItem";

@Component({
  selector: 'app-delete-modal-dialog',
  templateUrl: './delete-modal-dialog.component.html',
  styleUrls: ['./delete-modal-dialog.component.css']
})
export class DeleteModalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteModalDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ITaskItem) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close({taskText: this.data.taskText});
  }

}
