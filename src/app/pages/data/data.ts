import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './data.html',
  styleUrls: ['./data.scss']
})
export class Data implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      window.location.href = 'https://www.linkedin.com/in/thesurajrajput'; // ✅ Replace with your actual LinkedIn URL
    }, 3000); // 3 seconds delay before redirect
  }
}
