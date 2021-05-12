import { Component } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      this.toggleDisplayMode();
    });
  }
  toggleDisplayMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (mediaQuery) => this.toggleDarkTheme(mediaQuery.matches));
    this.toggleDarkTheme(prefersDark.matches);
  }

  // Add or remove the "dark" class based on if the media query matches
  private toggleDarkTheme(shouldAdd) {
    document.body.classList.toggle('dark', shouldAdd);
  }
}
