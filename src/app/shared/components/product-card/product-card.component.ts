import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';

interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  comparePrice?: number;
  image: string;
  woodType: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showQuickView = true;
  
  addToCart = output<Product>();
  quickView = output<Product>();

  getDiscountPercentage(): number | null {
    if (this.product.comparePrice && this.product.comparePrice > this.product.price) {
      return Math.round(((this.product.comparePrice - this.product.price) / this.product.comparePrice) * 100);
    }
    return null;
  }

  onAddToCart(event: Event): void {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  onQuickView(event: Event): void {
    event.stopPropagation();
    this.quickView.emit(this.product);
  }
}