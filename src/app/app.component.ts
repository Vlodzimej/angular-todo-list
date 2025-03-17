import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AlertComponent } from '@shared';
import { AlertService } from '@services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainComponent, AlertComponent],
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
