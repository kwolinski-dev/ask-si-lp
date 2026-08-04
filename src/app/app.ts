import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardItem } from './shared/card-item/card-item';

export interface Item {
  title: string;
  photoUrl: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [CardItem],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly platformId = inject(PLATFORM_ID);
  private copiedTimeoutId?: ReturnType<typeof setTimeout>;

  activeCardIndex = signal<number | null>(null);
  copied = signal(false);

  items = signal<Item[]>([
    {
      title: 'Automate and\noptimize operation\neffortlessly',
      photoUrl: 'icon2.svg',
      text: `The platform integrates advanced
      Al tools into everyday business
      activities, making them intuitive,
      accessible, and immediately
      valuable — regardless of
      company size or technological
      maturity.`,
    },
    {
      title: 'Acces and\ndevelop AI-driven\nsolutions',
      photoUrl: 'icon3.svg',
      text: `The platform integrates advanced
      Al tools into everyday business
      activities, making them intuitive,
      accessible, and immediately
      valuable — regardless of
      company size or technological
      maturity.`,
    },
    {
      title: 'Build global partnership',
      photoUrl: 'icon1.svg',
      text: `The platform integrates advanced
      Al tools into everyday business
      activities, making them intuitive,
      accessible, and immediately
      valuable — regardless of
      company size or technological
      maturity.`,
    },
  ]);

  toggleActiveCard(index: number): void {
    this.activeCardIndex.update((current) => (current === index ? null : index));
  }

  copyEmail(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard?.writeText('info@asksi.com');
    }

    this.copied.set(true);
    clearTimeout(this.copiedTimeoutId);
    this.copiedTimeoutId = setTimeout(() => this.copied.set(false), 3000);
  }
}
