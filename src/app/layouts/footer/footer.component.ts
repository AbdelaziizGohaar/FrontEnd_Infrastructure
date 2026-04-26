import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  newsletterEmail = '';
  
  subscribeNewsletter(): void {
    if (this.newsletterEmail) {
      console.log('Subscribed:', this.newsletterEmail);
      this.newsletterEmail = '';
      // Add your subscription logic here
    }
  }
}