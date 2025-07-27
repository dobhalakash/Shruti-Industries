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
  searchQuery = '';

  constructor(private router: Router) {}

  // Trigger scroll-based navbar effects
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  // Collapse menu and dropdown on nav link click
  handleNavClick(path: string): void {
    this.isMenuOpen = false;
    this.activeDropdown = null;
    if (path) {
      this.router.navigate([path]);
    }
  }

  // Toggle mobile dropdown menus
  toggleDropdown(id: string): void {
    this.activeDropdown = this.activeDropdown === id ? null : id;
  }

  // Handle search redirect
  redirectToSearch(): void {
    const trimmed = this.searchQuery.trim();
    if (trimmed) {
      this.router.navigate(['/search'], {
        queryParams: { q: trimmed }
      });
      this.searchQuery = '';
      this.isMenuOpen = false;
    }
  }

  // Optional: close menu on route change globally
  // ngOnInit() {
  //   this.router.events.subscribe(() => {
  //     this.isMenuOpen = false;
  //     this.activeDropdown = null;
  //   });
  // }
}
