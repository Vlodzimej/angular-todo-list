import { Component, ViewChild } from '@angular/core';
import { AlertComponent } from '@shared';
import { AlertService } from '@services';
import { MainComponent } from '@pages';

@Component({
  selector: 'app-root',
  imports: [MainComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  constructor(private alertService: AlertService) {}

  ngAfterViewInit() {
    this.alertService.registerPopupComponent(this.alertComponent);
  }
}
