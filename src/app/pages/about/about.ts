import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  trigger,
  state,query,stagger,
  style,
  transition,
  animate
} from '@angular/animations';

interface AnimatedElement {
  id: number;
  x: number;
  y: number;
  delay: number;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './about.html',
  styleUrls: ['./about.scss'],
  animations: [

    trigger('staggerAnimation', [
  transition(':enter', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(20px)' }),
      stagger(100, [
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ], { optional: true })
  ])
]),
    trigger('slideUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('800ms ease-out'))
    ]),
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('600ms ease-in'))
    ]),
    trigger('scaleIn', [
      state('hidden', style({ opacity: 0, transform: 'scale(0.8)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('500ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('slideRight', [
      transition(':enter', [
        style({ transform: 'translateX(-50%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideLeft', [
      transition(':enter', [
      ])
    ]),
    trigger('fadeInUp', [
      transition(':enter', [
        style({ transform: 'translateY(30px)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class About implements OnInit, OnDestroy, AfterViewInit {
  aboutVisible = false;
  contactForm: FormGroup;
  showSuccessModal = false;
  successMessage = '';
  animatedElements: AnimatedElement[] = [];
  private animationFrame: number = 0;
  private isBrowser: boolean;

  @ViewChild('aboutSticky', { static: false }) aboutSticky!: ElementRef<HTMLElement>;
  @ViewChild('timelineSticky', { static: false }) timelineSticky!: ElementRef<HTMLElement>;



  techDomains = [
    {
      icon: '☁️', name: 'Cloud Computing', description: 'Scalable cloud infrastructure and microservices architecture for modern applications',
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Serverless']
    },
    {
      icon: '🤖', name: 'Artificial Intelligence', description: 'Machine learning and AI solutions for predictive analytics and automation',
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision', 'NLP']
    },
    {
      icon: '📱', name: 'Mobile Development', description: 'Cross-platform mobile applications for iOS and Android platforms',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic']
    },
    {
      icon: '🌐', name: 'Web Technologies', description: 'Modern web applications using cutting-edge frameworks and technologies',
      technologies: ['Angular', 'React', 'Vue.js', 'Node.js', 'TypeScript']
    },
    {
      icon: '🔒', name: 'Cybersecurity', description: 'Advanced security solutions and compliance frameworks for enterprise protection',
      technologies: ['Zero Trust', 'SIEM', 'Encryption', 'Penetration Testing', 'Compliance']
    },
    {
      icon: '⚛️', name: 'Quantum Computing', description: 'Research and development in quantum algorithms and quantum-safe cryptography',
      technologies: ['Qiskit', 'Cirq', 'Quantum ML', 'Cryptography', 'Optimization']
    }
  ];

  constructor(
    private readonly fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', Validators.required]
    });
  }


  

  ngOnInit(): void {
    this.initializeAnimations();
    if (this.isBrowser) this.startAnimationLoop();
    this.setupAnimations();
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      setTimeout(() => (this.aboutVisible = true), 1300);
      this.initializeScrollAnimations();
    }
  }

  ngOnDestroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
  }

  private initializeAnimations(): void {
    for (let i = 0; i < 15; i++) {
      this.animatedElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5
      });
    }
  }

  private startAnimationLoop(): void {
    const animate = () => {
      this.updateAnimations();
      this.animationFrame = requestAnimationFrame(animate);
    };
    if (this.isBrowser) requestAnimationFrame(animate);
  }

  private updateAnimations(): void {
    const now = Date.now();
    this.animatedElements.forEach(element => {
      element.x += Math.sin(now * 0.001 + element.id) * 0.1;
      element.y += Math.cos(now * 0.001 + element.id) * 0.1;

      if (element.x > 100) element.x = 0;
      if (element.x < 0) element.x = 100;
      if (element.y > 100) element.y = 0;
      if (element.y < 0) element.y = 100;
    });
  }

  private initializeScrollAnimations(): void {
    if (!this.isBrowser) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll('.fade-in-on-scroll');
    elementsToObserve.forEach(el => observer.observe(el));
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.isBrowser) return;

    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    const parallaxElements = document.querySelectorAll('.floating-vehicle');
    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      (element as HTMLElement).style.transform = `translateY(${rate * speed}px)`;
    });

    this.revealOnScroll();
  }

  private revealOnScroll(): void {
    const reveals = document.querySelectorAll('.fade-in-on-scroll');
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  }

  getRandomPosition(): number {
    return Math.random() * 100;
  }

  getRandomDelay(): number {
    return Math.random() * 5;
  }

  submitContact(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      console.log('Contact form submitted:', formData);

      this.showLoadingState();

      setTimeout(() => {
        this.showSuccessMessage('Thank you for contacting us! We will get back to you within 24 hours.');
        this.contactForm.reset();
      }, 1500);
    } else {
      this.showValidationErrors();
    }
  }

  private showLoadingState(): void {
    const submitButton = document.querySelector('.submit-btn');
    if (submitButton) submitButton.classList.add('loading');
  }

  private showValidationErrors(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      if (control?.invalid) {
        const field = document.querySelector(`[formControlName="${key}"]`);
        if (field) {
          field.classList.add('shake-error');
          setTimeout(() => field.classList.remove('shake-error'), 600);
        }
      }
    });
  }

  private showSuccessMessage(message: string): void {
    this.successMessage = message;
    this.showSuccessModal = true;
    this.triggerCelebrationAnimation();
  }

  private triggerCelebrationAnimation(): void {
    this.createConfetti();
  }

  private createConfetti(): void {
    if (!this.isBrowser) return;
    const colors = ['#00bcd4', '#4ec5f1', '#00a3a5', '#ffd700'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 10001;
        animation: confettiFall 3s ease-out forwards;
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  closeModal(): void {
    this.showSuccessModal = false;
    this.successMessage = '';
    const submitButton = document.querySelector('.submit-btn');
    if (submitButton) submitButton.classList.remove('loading');
  }

  onProfileHover(profileElement: HTMLElement): void {
    profileElement.style.transform = 'scale(1.05) rotate(2deg)';
  }

  onProfileLeave(profileElement: HTMLElement): void {
    profileElement.style.transform = 'scale(1) rotate(0deg)';
  }

  onTechItemClick(item: string): void {
    const clickedElement = event?.target as HTMLElement;
    if (clickedElement) {
      clickedElement.style.transform = 'scale(0.95)';
      setTimeout(() => {
        clickedElement.style.transform = 'scale(1)';
      }, 150);
    }
    console.log(`Navigating to ${item}`);
  }

  onCarouselSlide(direction: 'prev' | 'next'): void {
    const carousel = document.querySelector('.carousel-inner');
    if (carousel) {
      carousel.classList.add(`sliding-${direction}`);
      setTimeout(() => {
        carousel.classList.remove(`sliding-${direction}`);
      }, 600);
    }
  }

  onButtonClick(buttonType: 'chat' | 'login'): void {
    const button = event?.target as HTMLElement;
    if (button) {
      const ripple = button.querySelector('.button-ripple') as HTMLElement;
      if (ripple) {
        ripple.style.width = '300px';
        ripple.style.height = '300px';
        setTimeout(() => {
          ripple.style.width = '0';
          ripple.style.height = '0';
        }, 600);
      }
    }
    console.log(`${buttonType} button clicked`);
  }

  private setupAnimations() {
  if (!this.isBrowser || typeof IntersectionObserver === 'undefined') {
    console.warn('IntersectionObserver is not available in this environment.');
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  }, { threshold: 0.1 });

  setTimeout(() => {
    const animatedElements = document.querySelectorAll('.domain-card, .timeline-item');
    animatedElements.forEach(el => observer.observe(el));
  }, 100);
}
}