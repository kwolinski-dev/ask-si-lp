import { Component, signal } from '@angular/core';
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
  items = signal<Item[]>([
    {
      title: 'Automate and\noptimize operation\neffortlessly',
      photoUrl: '/icon1.svg',
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
      photoUrl: '/icon2.svg',
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
      photoUrl: '/icon3.svg',
      text: `The platform integrates advanced
      Al tools into everyday business
      activities, making them intuitive,
      accessible, and immediately
      valuable — regardless of
      company size or technological
      maturity.`,
    },
  ]);
}
