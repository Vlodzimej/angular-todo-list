import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [CommonModule]
})
export class PopupComponent {
  @Input() title: string = "";
  @Input() isCloseButtonVisible = true;

  isVisible = false;

  show() {
    this.isVisible = true;
  }

  dismiss() {
    this.isVisible = false;
  }

  handleOverlayClick(e: Event) {
    e.stopPropagation();
    this.dismiss();
  }

  handleContentClick(e: Event) {
    e.stopPropagation();
  }

  handleCloseButtonClick(e: Event) {
    this.dismiss();
  }
}
