import { Injectable } from '@angular/core';
import { AlertComponent } from '@shared';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertPopupComponent: AlertComponent | null = null;

  /** Получение ссылки на компонент алерта */
  registerPopupComponent(component: AlertComponent): void {
    this.alertPopupComponent = component;
  }

  /** Отображение алерта */
  showAlert(message: string): void {
    if (this.alertPopupComponent) {
      this.alertPopupComponent.show(message);
    } else {
      console.error('AlertPopupComponent is not registered.');
    }
  }

  /** Закрытие алерта */
  dismiss() {
    this.alertPopupComponent?.dismiss();
  }
}
