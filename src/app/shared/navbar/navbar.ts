import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  isMenuOpen = false;
  isScrolled = false;
  activeDropdown: string | null = null;
  searchQuery: string = '';

  constructor(private router: Router) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  handleNavClick(path: string): void {
    this.isMenuOpen = false;
    this.activeDropdown = null;
    this.router.navigate([path]);
  }

  toggleDropdown(id: string): void {
    this.activeDropdown = this.activeDropdown === id ? null : id;
  }

  redirectToSearch(): void {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchQuery.trim() }
    });
    this.searchQuery = '';
  }
}
