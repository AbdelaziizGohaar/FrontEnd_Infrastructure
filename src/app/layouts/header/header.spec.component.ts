import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  lang = inject(LanguageService); // public — template uses lang.isRtl()

  isLoggedIn = signal(false);
  isAdmin = signal(false);
  cartItemsCount = signal(0);
  wishlistCount = signal(3);

  searchQuery = '';
  mobileMenuOpen = false;
  mobileSearchOpen = false;
  desktopSearchOpen = false;

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.isLoggedIn.set(!!user);
      this.isAdmin.set(user?.role === 'admin');
    });

    this.cartService.cartItemsCount$.subscribe((count) => {
      this.cartItemsCount.set(count);
    });

    const cart = this.cartService.getCart();
    this.cartItemsCount.set(cart?.items?.length || 0);
  }

  toggleLang(): void { this.lang.toggle(); }
  logout(): void { this.authService.logout(); }

  searchProducts(): void {
    if (this.searchQuery.trim()) {
      console.log('Searching for:', this.searchQuery);
      this.searchQuery = '';
      this.desktopSearchOpen = false;
      this.mobileSearchOpen = false;
      this.mobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
  }

  toggleDesktopSearch(): void { this.desktopSearchOpen = !this.desktopSearchOpen; }

  closeSearch(): void {
    this.desktopSearchOpen = false;
    this.mobileSearchOpen = false;
    this.searchQuery = '';
  }
}