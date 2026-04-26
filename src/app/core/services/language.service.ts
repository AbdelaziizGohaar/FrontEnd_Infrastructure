import { Injectable, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type Lang = 'en' | 'ar';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private document = inject(DOCUMENT);
  private http = inject(HttpClient);

  // ── State ────────────────────────────────────────────────────────────────────
  currentLang = signal<Lang>(this.getSavedLang());
  isRtl = computed(() => this.currentLang() === 'ar');

  private translations = signal<Record<string, any>>({});
  private loadSeq = 0;

  constructor() {
    // Apply direction + lang attribute whenever language changes
    effect(() => {
      const lang = this.currentLang();
      this.document.documentElement.setAttribute('lang', lang);
      this.document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      this.loadTranslations(lang);
    });
  }

  // ── Public API ───────────────────────────────────────────────────────────────
  toggle(): void {
    const next: Lang = this.currentLang() === 'en' ? 'ar' : 'en';
    this.setLang(next);
  }

  setLang(lang: Lang): void {
    localStorage.setItem('lang', lang);
    this.currentLang.set(lang);
  }

  /** Translate a dot-notation key, e.g. t('nav.home') */
  t(key: string): string {
    const normalizedKey = key.trim();
    const keys = normalizedKey.split('.');
    let value: any = this.translations();
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return normalizedKey; // fallback: return key itself
    }
    return typeof value === 'string' ? value : normalizedKey;
  }

  // ── Private ──────────────────────────────────────────────────────────────────
  private getSavedLang(): Lang {
    const saved = localStorage.getItem('lang') as Lang;
    return saved === 'ar' ? 'ar' : 'en';
  }

  private async loadTranslations(lang: Lang): Promise<void> {
    const reqId = ++this.loadSeq;
    try {
      // Use a relative path to the `assets` folder to avoid base-href issues
      const data = await firstValueFrom(
        this.http.get<Record<string, any>>(`./assets/i18n/${lang}.json`),
      );

      // Ignore stale async responses if user switched language quickly.
      if (reqId === this.loadSeq) {
        this.translations.set(data ?? {});
      }
    } catch (e) {
      this.translations.set({});
      console.error(`Failed to load translations for: ${lang}`, e);
    }
  }
}
