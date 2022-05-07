import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.scss']
})
export class DialogTemplateComponent implements OnInit {

  @Input() dialogTitle: string;
  @Input() hasHeader = true;
  @Input() hasCloseIcon = true;
  @Input() hasGoBackIcon = false;
  @Input() isCloseButtonDisabled = false;
  @Output() close = new EventEmitter<Event>();
  @Output() goBack = new EventEmitter<Event>();

  constructor() { }

  ngOnInit() {
  }

  closeDialog(event) {
    this.close.emit(event);
  }

  goBackDialog(event) {
    this.goBack.emit(event);
  }

}


