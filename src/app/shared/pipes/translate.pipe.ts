import { Pipe, PipeTransform, inject } from '@angular/core';
import { LanguageService } from '../../core/services/language.service';

/**
 * Usage in templates:  {{ 'nav.home' | translate }}
 * The pipe is signal-aware — it re-evaluates whenever the language changes.
 */
@Pipe({
  name: 'translate',
  standalone: true,
  pure: false   // impure so it reacts to language signal changes
})
export class TranslatePipe implements PipeTransform {
  private lang = inject(LanguageService);

  transform(key: string): string {
    // Access `currentLang` signal so Angular tracks language changes
    // and re-evaluates this impure pipe when language switches.
    this.lang.currentLang();
    return this.lang.t(key);
  }
}