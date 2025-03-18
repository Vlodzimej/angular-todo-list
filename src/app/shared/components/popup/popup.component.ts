import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [CommonModule],
})
export class PopupComponent {
  @Input() title = '';
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

  handleCloseButtonClick() {
    this.dismiss();
  }
}
