import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from '../tasks/dialogDataInterface';


@Component({
  selector: 'app-alert-modal-dialog',
  templateUrl: './alert-modal-dialog.component.html',
  styleUrls: ['./alert-modal-dialog.component.css']
})
export class AlertModalDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlertModalDialogComponent>,
  @Inject(MAT_DIALOG_DATA) public data: DialogData)
  { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
