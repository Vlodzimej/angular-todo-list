import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'popup-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [PopupComponent],
})
export class AlertComponent implements OnInit {
  @ViewChild(PopupComponent) popup?: PopupComponent;

  message: string = '';

  constructor() {}

  ngOnInit() {}

  show(message: string) {
    this.message = message;
    this.popup?.show();
  }

  dismiss() {
    this.popup?.dismiss();
  }
}
