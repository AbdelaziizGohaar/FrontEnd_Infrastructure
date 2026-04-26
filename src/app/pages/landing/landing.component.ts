import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { HeroComponent } from '../../shared/components/hero/hero.component';

// Temporary mock data - will be replaced with API calls
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
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe, ProductCardComponent,HeroComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  featuredProducts = signal<Product[]>([]);
  newArrivals = signal<Product[]>([]);
  isLoading = signal(true);

  categories = [
    { id: 1, name: 'Cutting Boards', icon: 'bi-grid-3x3-gap-fill', route: '/products/category/cutting-boards', image: 'cutting-boards' },
    { id: 2, name: 'Spoons & Spatulas', icon: 'bi-egg-fried', route: '/products/category/spoons-spatulas', image: 'spoons' },
    { id: 3, name: 'Serving Ware', icon: 'bi-cup-straw', route: '/products/category/serving-ware', image: 'serving' },
    { id: 4, name: 'Knives & Utensils', icon: 'bi-scissors', route: '/products/category/knives', image: 'knives' }
  ];

  woodTypes = [
    { id: 'teak', name: 'Teak', color: '#c19a6b', description: 'Durable & water-resistant', route: '/products/wood/teak' },
    { id: 'walnut', name: 'Walnut', color: '#5c4033', description: 'Rich dark color', route: '/products/wood/walnut' },
    { id: 'oak', name: 'Oak', color: '#8b7355', description: 'Strong & sturdy', route: '/products/wood/oak' },
    { id: 'bamboo', name: 'Bamboo', color: '#e1cc9d', description: 'Eco-friendly', route: '/products/wood/bamboo' }
  ];

  testimonials = [
    { name: 'Sarah M.', text: 'These wooden spoons are absolutely beautiful! The craftsmanship is exceptional.', rating: 5 },
    { name: 'David L.', text: 'The cutting board is stunning. It has become the centerpiece of my kitchen.', rating: 5 },
    { name: 'Emma R.', text: 'Sustainable, beautiful, and functional. Everything I was looking for.', rating: 5 }
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    // Mock data - replace with actual API call
    setTimeout(() => {
      this.featuredProducts.set([
        {
          id: 1,
          name: 'Handcrafted Walnut Cutting Board',
          slug: 'walnut-cutting-board',
          price: 89.99,
          comparePrice: 129.99,
          image: 'assets/images/products/cutting-board-1.jpg',
          woodType: 'walnut',
          isFeatured: true
        },
        {
          id: 2,
          name: 'Teak Wood Spatula Set (3 pcs)',
          slug: 'teak-spatula-set',
          price: 45.99,
          comparePrice: 69.99,
          image: 'assets/images/products/spatula-set.jpg',
          woodType: 'teak',
          isFeatured: true
        },
        {
          id: 3,
          name: 'Olive Wood Salad Bowl',
          slug: 'olive-wood-salad-bowl',
          price: 59.99,
          comparePrice: 89.99,
          image: 'assets/images/products/salad-bowl.jpg',
          woodType: 'teak',
          isFeatured: true
        },
        {
          id: 4,
          name: 'Bamboo Utensil Set (5 pcs)',
          slug: 'bamboo-utensil-set',
          price: 34.99,
          image: 'assets/images/products/utensil-set.jpg',
          woodType: 'bamboo',
          isFeatured: true
        }
      ]);

      this.newArrivals.set([
        {
          id: 5,
          name: 'Hand-carved Oak Serving Platter',
          slug: 'oak-serving-platter',
          price: 79.99,
          image: 'assets/images/products/serving-platter.jpg',
          woodType: 'oak',
          isNew: true
        },
        {
          id: 6,
          name: 'Maple Wood Honey Dipper',
          slug: 'maple-honey-dipper',
          price: 12.99,
          image: 'assets/images/products/honey-dipper.jpg',
          woodType: 'maple',
          isNew: true
        },
        {
          id: 7,
          name: 'Cherry Wood Pizza Cutter',
          slug: 'cherry-pizza-cutter',
          price: 29.99,
          comparePrice: 49.99,
          image: 'assets/images/products/pizza-cutter.jpg',
          woodType: 'cherry',
          isNew: true
        }
      ]);

      this.isLoading.set(false);
    }, 500);
  }

  // Add these methods to the LandingComponent class
onAddToCart(product: Product): void {
  console.log('Add to cart:', product);
  // Will integrate with cart service later
}

onQuickView(product: Product): void {
  console.log('Quick view:', product);
  // Will implement quick view modal later
}
}