import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { taskStatuses } from '../constants/taskStatuses'

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.css']
})

export class OptionListComponent implements OnInit {

  @Input() status: string = '';
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  taskStatuses = taskStatuses;


  constructor()
  { }

  ngOnInit(): void {
  }

  setStatus(event: string){
    this.change.emit(event);
  }
}
