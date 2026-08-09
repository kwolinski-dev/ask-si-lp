/**
 * Podpowiedzi "to jest klikalne", pokazywane wylacznie na mobile.
 * 'glow'       — sam obracajacy sie luk swiatla na ramce
 * 'glow-pulse' — to samo plus oddychanie skali; zarezerwowane dla pierwszej
 *                karty, zeby nie wszystkie naraz sie ruszaly
 */
export type CardHint = 'glow' | 'glow-pulse';

export interface Item {
  title: string;
  photoUrl: string;
  text: string;
  mobileHint?: CardHint;
}
