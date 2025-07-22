import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar'; 
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent, 
    RouterModule,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  showNavbar = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Define the routes where you want to show the navbar
        const routesWithNavbar = ['/home', '/dashboard', '/about'];

        // Show or hide the navbar based on the current route
        this.showNavbar = routesWithNavbar.includes(event.urlAfterRedirects);
      });
  }
}
