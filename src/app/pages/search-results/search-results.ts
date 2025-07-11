import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ REQUIRED for ngIf, ngFor, ngModel
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.scss']
})
export class SearchResultsComponent {
  searchQuery: string = '';
  filteredProducts: any[] = [];

  allProducts = [
    { name: 'Two Wheeler Engine Bracket', description: 'High quality Engine Bracket', price: 2000 },
  { name: 'Two Wheeler PVC Clamps', description: 'Durable Two Wheeler PVC Clamps', price: 500 },
  { name: 'Magnet Puller Plate', description: 'Magnet Puller Plate for engine maintenance', price: 800 },
  { name: 'Two Wheeler Z Brackets', description: 'Z Brackets for Two Wheelers, strong and rustproof', price: 350 },
  { name: 'Two Wheeler PVC Cable Clip', description: 'PVC Cable Clip for neat cable management in two wheelers', price: 150 },
  { name: 'Two Wheeler Clamp', description: 'Universal Two Wheeler Clamp, heavy-duty build', price: 250 },
  { name: '3 Wheeler Z Brackets', description: 'Sturdy Z Brackets for 3 Wheelers', price: 400 },
  { name: 'Helmet', description: 'Safety helmet for rider protection', price: 1000 }
  ];

  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    );
  }
}
