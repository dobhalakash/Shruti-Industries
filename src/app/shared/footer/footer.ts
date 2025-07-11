import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // ✅ Standalone component (no need to declare in NgModule)
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'] // ✅ Correct usage of styleUrls (array)
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear(); // ✅ Used for dynamic year
}
