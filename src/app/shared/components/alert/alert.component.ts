import { Component, ViewChild } from '@angular/core';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-popup-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [PopupComponent],
})
export class AlertComponent {
  @ViewChild(PopupComponent) popup?: PopupComponent;

  message = '';

  show(message: string) {
    this.message = message;
    this.popup?.show();
  }

  dismiss() {
    this.popup?.dismiss();
  }
}
