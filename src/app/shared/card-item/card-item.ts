import { Component, computed, input, output, signal } from '@angular/core';
import { CardHint, Item } from './card-item.model';

@Component({
  selector: 'app-card-item',
  imports: [],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css',
})
export class CardItem {
  private static nextId = 0;
  private readonly uid = CardItem.nextId++;

  /** czytnik ekranu czyta tytul jako nazwe przycisku, a opis jako dodatek */
  protected readonly labelId = `card-item-label-${this.uid}`;
  protected readonly textId = `card-item-text-${this.uid}`;

  item = input.required<Item>();
  hint = input<CardHint | undefined>(undefined);
  active = input(false);
  cardClicked = output<void>();

  /** glow gasnie na dobre, gdy uzytkownik raz dotknie karty */
  protected readonly wasClicked = signal(false);

  /** luk swiatla — na kazdej karcie, ktora ma jakakolwiek podpowiedz */
  protected readonly showGlow = computed(() => this.hint() !== undefined && !this.wasClicked());

  /** oddychanie skali — tylko wariant 'glow-pulse' */
  protected readonly showPulse = computed(
    () => this.hint() === 'glow-pulse' && !this.wasClicked(),
  );

  onCardClick(): void {
    this.wasClicked.set(true);
    this.cardClicked.emit();
  }
}
