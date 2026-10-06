import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  private readonly document = inject(DOCUMENT);

  isDarkMode = signal(false);

  protected toggleTheme(): void {
    this.isDarkMode.update((isDark) => {
      const nextMode = !isDark;
      this.document.documentElement.classList.toggle('dark-mode', nextMode);
      return nextMode;
    });
  }

}
