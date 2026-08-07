/** podpowiedzi "to jest klikalne", pokazywane wylacznie na mobile */
export type CardHint = 'auto-demo' | 'peek' | 'pulse';

export interface Item {
  title: string;
  photoUrl: string;
  text: string;
  mobileHint?: CardHint;
}
