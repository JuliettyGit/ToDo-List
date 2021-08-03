import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})

export class OptionListComponent implements OnInit {

  @Input() status: string = '';
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  taskStatuses = [
    {
      status: 'Not Set',
      value: 'Not Set',
      class: 'notSet'
    },
    {
      status: 'Not Started',
      value: 'Not Started',
      class: 'notStarted'
    },
    {
      status: 'In Progress',
      value: 'In Progress',
      class: 'inProgress'
    },
    {
      status: 'Finished',
      value: 'Finished',
      class: 'finished'
    }
  ];

  constructor()
  { }

  ngOnInit(): void {
  }

  setStatus(event: string){
    this.change.emit(event);
    this.status = event;
    console.log(event)
  }
}
