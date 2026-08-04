import { Component, input, output } from '@angular/core';
import { Item } from '../../app';

@Component({
  selector: 'app-card-item',
  imports: [],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css',
})
export class CardItem {
  item = input.required<Item>();
  active = input(false);
  cardClicked = output<void>();

  onCardClick(): void {
    this.cardClicked.emit();
  }
}
