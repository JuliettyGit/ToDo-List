import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {


  currentYear = new Date().getFullYear();
  minDate: Date = new Date(this.currentYear, 0, 1);
  maxDate: Date = new Date(this.currentYear + 1, 11, 31);

  @Input() deadline!: Date | undefined;
  @Output() change: EventEmitter<Date> = new EventEmitter<Date>();

  constructor() { }

  ngOnInit(): void {}

  setDeadline(event: Date): void
  {
    this.change.emit(event);
  }
}
