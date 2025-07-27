import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar';
import { FooterComponent } from './shared/footer/footer';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  showDoors = true;
  showContent = false;
  showNavbar = false;

  constructor(private router: Router) {
    // ✅ Remove door after animation (2s) and show app content
   setTimeout(() => {
  this.showDoors = false;

  const routesWithNavbar = ['/home', '/dashboard', '/about'];
  const currentUrl = this.router.url;
  this.showNavbar = routesWithNavbar.includes(currentUrl);
}, 5000);
    // ✅ Handle navbar visibility on future navigations
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0 });
        }

        const routesWithNavbar = ['/home', '/dashboard', '/about'];
        this.showNavbar = routesWithNavbar.includes(event.urlAfterRedirects);
      });
  }
}
