import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

interface Particle {
  x: number;
  y: number;
  delay: number;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register implements OnInit, OnDestroy {
  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  isLoading = false;
  registrationSuccess = false;
  showParticleBurst = false;
  floatingIcons: FloatingIcon[] = [];
  particles: Particle[] = [];
  private animationFrame: number = 0;

  private iconTypes = [
    'bi-person-plus-fill',
    'bi-envelope-fill',
    'bi-shield-check-fill',
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
    'bi-award-fill',
    'bi-bookmark-star-fill',
    'bi-magic',
    'bi-sparkle',
    'bi-balloon-fill'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  ngOnInit() {
    this.initializeFloatingIcons();
    this.initializeParticles();
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

  private initializeParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 100 + Math.random() * 100;
      
      this.particles.push({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        delay: Math.random() * 0.5
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

  private startParticleBurst() {
    this.showParticleBurst = true;
    
    // Stop particle burst after 2 seconds
    setTimeout(() => {
      this.showParticleBurst = false;
    }, 2000);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  submitForm() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fix the errors in the form.';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    // Simulate API call delay
    setTimeout(() => {
      this.http.post(
        'http://localhost:8080/api/register',
        this.registerForm.value,
        { responseType: 'text' }
      ).subscribe({
        next: (response: string) => {
          console.log('Registration successful!', response);
          this.isLoading = false;
          this.registrationSuccess = true;
          this.successMessage = response || 'Registration successful!';
          this.errorMessage = '';
          
          // Start particle burst effect
          this.startParticleBurst();
          
          // Reset form after animation
          setTimeout(() => {
            this.registerForm.reset();
            this.registrationSuccess = false;
          }, 3000);
        },
        error: (error) => {
          console.error('Error during registration', error);
          this.isLoading = false;
          this.registrationSuccess = false;
          this.successMessage = '';
          this.errorMessage = error.error || 'Something went wrong during registration.';
        }
      });
    }, 1000);
  }
}