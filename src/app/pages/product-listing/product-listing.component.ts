import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-listing',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-5">
      <h1>Product Listing Page</h1>
      <p>Coming soon...</p>
    </div>
  `
})
export class ProductListingComponent {}