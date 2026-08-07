import { afterNextRender, Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CardItem } from './shared/card-item/card-item';

/** podpowiedzi "to jest klikalne", pokazywane wylacznie na mobile */
export type CardHint = 'auto-demo' | 'peek';

export interface Item {
  title: string;
  photoUrl: string;
  text: string;
  mobileHint?: CardHint;
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
  private readonly cardTimeouts = new Map<number, ReturnType<typeof setTimeout>>();
  private static readonly CARD_ACTIVE_DURATION = 8000;
  private static readonly AUTO_DEMO_DELAY = 600;
  private static readonly AUTO_DEMO_DURATION = 2000;

  activeCardIndices = signal<ReadonlySet<number>>(new Set());
  copied = signal(false);
  isDraggingCards = signal(false);

  private dragStartX = 0;
  private dragStartScrollLeft = 0;
  private dragMoved = false;

  items = signal<Item[]>([
    {
      mobileHint: 'auto-demo',
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
      mobileHint: 'peek',
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

  constructor() {
    // tylko przegladarka; na serwerze afterNextRender sie nie uruchamia
    afterNextRender(() => this.runMobileAutoDemo());
  }

  /** na mobile pierwsza karta sama odslania sie na chwile po wejsciu na strone */
  private runMobileAutoDemo(): void {
    if (!window.matchMedia('(width < 48rem)').matches) {
      return;
    }

    const index = this.items().findIndex((item) => item.mobileHint === 'auto-demo');
    if (index < 0) {
      return;
    }

    setTimeout(() => {
      this.activeCardIndices.update((current) => new Set(current).add(index));
      this.cardTimeouts.set(
        index,
        setTimeout(() => this.deactivateCard(index), App.AUTO_DEMO_DURATION),
      );
    }, App.AUTO_DEMO_DELAY);
  }

  onCardClicked(index: number): void {
    if (this.dragMoved) {
      return;
    }

    this.toggleActiveCard(index);
  }

  onCardsDragStart(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    this.isDraggingCards.set(true);
    this.dragMoved = false;
    this.dragStartX = event.pageX;
    this.dragStartScrollLeft = el.scrollLeft;
  }

  onCardsDragMove(event: MouseEvent): void {
    if (!this.isDraggingCards()) {
      return;
    }

    const el = event.currentTarget as HTMLElement;
    const delta = event.pageX - this.dragStartX;
    if (Math.abs(delta) > 3) {
      this.dragMoved = true;
    }

    el.scrollLeft = this.dragStartScrollLeft - delta;
    event.preventDefault();
  }

  onCardsDragEnd(): void {
    this.isDraggingCards.set(false);
  }

  toggleActiveCard(index: number): void {
    if (this.activeCardIndices().has(index)) {
      this.deactivateCard(index);
      return;
    }

    this.activeCardIndices.update((current) => new Set(current).add(index));
    this.cardTimeouts.set(
      index,
      setTimeout(() => this.deactivateCard(index), App.CARD_ACTIVE_DURATION),
    );
  }

  private deactivateCard(index: number): void {
    clearTimeout(this.cardTimeouts.get(index));
    this.cardTimeouts.delete(index);
    this.activeCardIndices.update((current) => {
      const next = new Set(current);
      next.delete(index);
      return next;
    });
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
