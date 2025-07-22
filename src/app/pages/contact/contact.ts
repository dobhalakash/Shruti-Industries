import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss'],
  animations: [
    trigger('fadeInUp', [
      state('void', style({ opacity: 0, transform: 'translateY(40px)' })),
      transition(':enter', [
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Contact {
  contactForm = {
    name: '',
    email: '',
    phone: '',    // ✅ Added phone field
    message: ''
  };

  onSubmit() {
    console.log('Form submitted:', this.contactForm);
    // TODO: Send to backend via HTTP
  }
}
