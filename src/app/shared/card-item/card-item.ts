import { Component, input } from '@angular/core';
import { Item } from '../../app';

@Component({
  selector: 'app-card-item',
  imports: [],
  templateUrl: './card-item.html',
  styleUrl: './card-item.css',
})
export class CardItem {
  item = input.required<Item>();
}
