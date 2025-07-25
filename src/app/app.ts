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
  showNavbar = false;

  constructor(private router: Router) {
    // Remove door after animation (2s)
    setTimeout(() => {
      this.showDoors = false;
    }, 2000);

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
