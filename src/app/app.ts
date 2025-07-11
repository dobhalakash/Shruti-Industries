import { Component } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar'; 
import { RouterModule } from '@angular/router';
import { FooterComponent } from './shared/footer/footer';
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
export class App {}

