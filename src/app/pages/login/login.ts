import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';

interface FloatingIcon {
  id: number;
  icon: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: { x: number; y: number };
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

interface RainDrop {
  x: number;
  delay: number;
  duration: number;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginSuccess = false;
  loginError = false;
  isLoading = false;
  showThunderstorm = false;
  floatingIcons: FloatingIcon[] = [];
  rainDrops: RainDrop[] = [];
  private animationFrame: number = 0;
  
  private iconTypes = [
    'bi-shield-lock-fill',
    'bi-person-fill',
    'bi-envelope-fill',
    'bi-key-fill',
    'bi-lock-fill',
    'bi-star-fill',
    'bi-heart-fill',
    'bi-diamond-fill',
    'bi-circle-fill',
    'bi-triangle-fill',
    'bi-square-fill',
    'bi-gem',
    'bi-lightning-fill',
    'bi-check-circle-fill',
    'bi-arrow-right-circle-fill',
    'bi-cloud-lightning-fill',
    'bi-cloud-rain-fill',
    'bi-droplet-fill',
    'bi-sun-fill',
    'bi-moon-stars-fill'
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.initializeFloatingIcons();
    this.initializeRainDrops();
    this.startAnimation();
  }

  ngOnDestroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private initializeFloatingIcons() {
    const iconCount = 30;
    
    for (let i = 0; i < iconCount; i++) {
      this.floatingIcons.push({
        id: i,
        icon: this.iconTypes[Math.floor(Math.random() * this.iconTypes.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 25 + 10,
        speed: Math.random() * 0.5 + 0.2,
        direction: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        opacity: Math.random() * 0.3 + 0.1
      });
    }
  }

  private initializeRainDrops() {
    const dropCount = 100;
    
    for (let i = 0; i < dropCount; i++) {
      this.rainDrops.push({
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 0.5 + 0.5
      });
    }
  }

  private startAnimation() {
    const animate = () => {
      this.updateFloatingIcons();
      this.animationFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  private updateFloatingIcons() {
    this.floatingIcons.forEach(icon => {
      // Update position
      icon.x += icon.direction.x * icon.speed;
      icon.y += icon.direction.y * icon.speed;
      
      // Update rotation
      icon.rotation += icon.rotationSpeed;
      
      // Update opacity for breathing effect
      icon.opacity = 0.1 + Math.sin(Date.now() * 0.001 + icon.id) * 0.2;
      
      // Wrap around screen edges
      if (icon.x < -50) icon.x = window.innerWidth + 50;
      if (icon.x > window.innerWidth + 50) icon.x = -50;
      if (icon.y < -50) icon.y = window.innerHeight + 50;
      if (icon.y > window.innerHeight + 50) icon.y = -50;
    });
  }

  private startThunderstorm() {
    this.showThunderstorm = true;
    
    // Stop thunderstorm after 3 seconds
    setTimeout(() => {
      this.showThunderstorm = false;
    }, 3000);
  }

  onLogin(): void {
    if (this.loginForm.invalid) return;
    
    this.isLoading = true;
    this.loginError = false;
    
    const { email, password } = this.loginForm.value;
    const loginData = { email, password };

    // Simulate API call delay
    setTimeout(() => {
      this.http.post('http://localhost:8080/api/register/login', loginData)
        .subscribe({
          next: (response: any) => {
            console.log('Login success:', response);
            this.isLoading = false;
            this.loginSuccess = true;
            this.loginError = false;
            
            // Start thunderstorm effect
            this.startThunderstorm();
            
            // Navigate after thunderstorm
            setTimeout(() => {
              this.router.navigate(['/data']);
            }, 3500);
          },
          error: (error: HttpErrorResponse) => {
            console.error('Login failed:', error);
            this.isLoading = false;
            this.loginSuccess = false;
            this.loginError = true;
          }
        });
    }, 1000);
  }
}