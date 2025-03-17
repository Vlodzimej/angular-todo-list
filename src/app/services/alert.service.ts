import { Injectable } from '@angular/core';
import { AlertComponent } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertPopupComponent: AlertComponent | null = null;

  registerPopupComponent(component: AlertComponent): void {
    this.alertPopupComponent = component;
  }

  showAlert(message: string): void {
    if (this.alertPopupComponent) {
      this.alertPopupComponent.show(message);
    } else {
      console.error('AlertPopupComponent is not registered.');
    }
  }

  dismiss() {
    this.alertPopupComponent?.dismiss();
  }
}
