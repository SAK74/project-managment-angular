import { Injectable } from '@angular/core';
import { LangType } from 'src/languages';
import polish from 'src/languages/polish';

@Injectable()
export class TranslatService {
  language: LangType = 'en';
  setLang(lang: LangType) {
    this.language = lang;
  }
  translate(text: string) {
    switch (this.language) {
      case 'pl':
        return polish[text];
      default:
        return text;
    }
  }
}
