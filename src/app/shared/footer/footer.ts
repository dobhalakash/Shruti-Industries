import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class FooterComponent {
  technologies = [
    'High Performance Computing',
    'Quantum Computing',
    'AI & Multilingual Computing',
    'Strategic Electronics',
    'Software Technologies',
    'Health Informatics',
    'Education & Training',
    'Cyber Security & Forensics'
  ];

  quickLinks = [
    'About Us',
    'Our Milestones',
    'Technology Portfolio',
    'Innovation Labs',
    'Career Opportunities',
    'Partner Program',
    'News & Updates',
    'Contact Us'
  ];
}
