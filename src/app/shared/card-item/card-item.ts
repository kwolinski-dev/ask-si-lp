import { Component, input, output } from '@angular/core';
import { CardHint, Item } from '../../app';

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

  onCardClick(): void {
    this.cardClicked.emit();
  }
}
