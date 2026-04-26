import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  currentSlide = 0;
  
  slides = [
    {
      title: 'hero.title1',
      subtitle: 'hero.subtitle1',
      cta: 'hero.cta',
      image: 'assets/images/hero/hero-1.jpg',
      woodType: 'walnut'
    },
    {
      title: 'hero.title2',
      subtitle: 'hero.subtitle2',
      cta: 'hero.cta',
      image: 'assets/images/hero/hero-2.jpg',
      woodType: 'teak'
    }
  ];

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }
}