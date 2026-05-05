import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';
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
  isLoggedIn = signal(false);
  isAdmin = signal(false);
  cartItemsCount = signal(0);
  wishlistCount = signal(3);
  notificationsCount = signal(0);

  searchQuery = '';
  mobileMenuOpen = false;
  mobileSearchOpen = false;
  desktopSearchOpen = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    public lang: LanguageService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: User | null) => {
      this.isLoggedIn.set(!!user);
      this.isAdmin.set(user?.role === 'admin');
    });

    this.cartService.cartItemsCount$.subscribe((count: number) => {
      this.cartItemsCount.set(count);
    });

    this.loadCartCount();
  }

  private loadCartCount(): void {
    const cart = this.cartService.getCart();
    this.cartItemsCount.set(cart?.items?.length || 0);
  }

  logout(): void {
    this.authService.logout();
  }

  toggleLang(): void {
    this.lang.toggle();
  }

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
    if (this.mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  }

  toggleMobileSearch(): void {
    this.mobileSearchOpen = !this.mobileSearchOpen;
  }

  toggleDesktopSearch(): void {
    this.desktopSearchOpen = !this.desktopSearchOpen;
  }

  closeSearch(): void {
    this.desktopSearchOpen = false;
    this.mobileSearchOpen = false;
    this.searchQuery = '';
  }

  notificationCount(): number {
    return this.notificationsCount();
  }
}