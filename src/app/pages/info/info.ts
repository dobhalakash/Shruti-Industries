import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title fade-in-up">
            Empowering Technology, Healthcare, Education & Logistics through Innovation
          </h1>
          <p class="hero-subtitle fade-in-up delay-1">
            Leading digital transformation across industries with cutting-edge solutions and expert consultation
          </p>
          <div class="hero-buttons fade-in-up delay-2">
            <button class="primary-btn">Explore Services</button>
            <button class="secondary-btn">Watch Demo</button>
          </div>
        </div>
        
        <!-- Vehicle Animation -->
        <div class="road-animation">
          <div class="road">
            <div class="road-lines"></div>
          </div>
          <div class="vehicle">
            <svg viewBox="0 0 100 40" class="truck-svg">
              <rect x="10" y="20" width="50" height="15" fill="#3b82f6" rx="3"/>
              <rect x="65" y="15" width="25" height="20" fill="#1d4ed8" rx="2"/>
              <circle cx="25" cy="38" r="4" fill="#374151"/>
              <circle cx="75" cy="38" r="4" fill="#374151"/>
              <rect x="12" y="22" width="8" height="3" fill="#60a5fa"/>
              <rect x="67" y="17" width="6" height="4" fill="#93c5fd"/>
            </svg>
          </div>
        </div>
      </section>

      <!-- Key Services Section -->
      <section class="services-section">
        <div class="container">
          <h2 class="section-title">Our Key Services</h2>
          <div class="services-grid">
            <div class="service-card" *ngFor="let service of services; let i = index" 
                 [style.animation-delay]="i * 0.1 + 's'">
              <div class="service-icon">{{ service.icon }}</div>
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Industries Section -->
      <section class="industries-section">
        <div class="container">
          <h2 class="section-title">Industries We Serve</h2>
          <div class="industries-grid">
            <div class="industry-card" *ngFor="let industry of industries; let i = index"
                 [style.animation-delay]="i * 0.15 + 's'">
              <div class="industry-icon">{{ industry.icon }}</div>
              <h3>{{ industry.name }}</h3>
              <p>{{ industry.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Client Base Section -->
      <section class="clients-section">
        <div class="container">
          <h2 class="section-title">Trusted by Industry Leaders</h2>
          <div class="clients-grid">
            <div class="client-card" *ngFor="let client of clients; let i = index"
                 [style.animation-delay]="i * 0.1 + 's'">
              <div class="client-avatar">{{ client.initial }}</div>
              <h4>{{ client.name }}</h4>
              <p>{{ client.industry }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Platforms Section -->
      <section class="platforms-section">
        <div class="container">
          <h2 class="section-title">Our Major Platforms & Products</h2>
          <div class="platforms-carousel">
            <div class="platform-card" *ngFor="let platform of platforms; let i = index"
                 [style.animation-delay]="i * 0.2 + 's'">
              <div class="platform-header">
                <div class="platform-icon">{{ platform.icon }}</div>
                <h3>{{ platform.name }}</h3>
              </div>
              <p>{{ platform.description }}</p>
              <ul>
                <li *ngFor="let feature of platform.features">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./info.scss']
})
export class Info implements OnInit {
  services = [
    {
      icon: '🚀',
      title: 'Digital Transformation',
      description: 'Complete digital overhaul solutions for modern enterprises'
    },
    {
      icon: '🏥',
      title: 'Healthcare Technology',
      description: 'Advanced healthcare management and patient care systems'
    },
    {
      icon: '📚',
      title: 'Education Solutions',
      description: 'LMS platforms and educational technology implementations'
    },
    {
      icon: '📦',
      title: 'Logistics Management',
      description: 'End-to-end supply chain and logistics optimization'
    },
    {
      icon: '🤖',
      title: 'AI & Automation',
      description: 'Intelligent automation and machine learning solutions'
    },
    {
      icon: '⚛️',
      title: 'Quantum Computing',
      description: 'Next-generation quantum computing research and development'
    }
  ];

  industries = [
    {
      icon: '🏭',
      name: 'Manufacturing',
      description: 'Smart factory solutions and Industry 4.0 implementations'
    },
    {
      icon: '🏥',
      name: 'Healthcare',
      description: 'Digital health platforms and medical technology'
    },
    {
      icon: '🎓',
      name: 'Education',
      description: 'E-learning platforms and educational management systems'
    },
    {
      icon: '🚛',
      name: 'Logistics',
      description: 'Supply chain optimization and fleet management'
    },
    {
      icon: '🏦',
      name: 'Finance',
      description: 'Fintech solutions and digital banking platforms'
    },
    {
      icon: '🌱',
      name: 'Sustainability',
      description: 'Green technology and environmental monitoring systems'
    }
  ];

  clients = [
    { initial: 'TG', name: 'TechGlobal Corp', industry: 'Technology' },
    { initial: 'MH', name: 'MedHealth Systems', industry: 'Healthcare' },
    { initial: 'EU', name: 'EduUniversity', industry: 'Education' },
    { initial: 'LL', name: 'LogiLink Solutions', industry: 'Logistics' },
    { initial: 'FI', name: 'FinanceFirst', industry: 'Banking' },
    { initial: 'GE', name: 'GreenEnergy Co', industry: 'Sustainability' }
  ];

  platforms = [
    {
      icon: '🎓',
      name: 'EduTech LMS',
      description: 'Comprehensive learning management system with AI-powered personalization',
      features: ['Interactive Learning Modules', 'Progress Analytics', 'Virtual Classrooms', 'Assessment Tools']
    },
    {
      icon: '🏥',
      name: 'HealthCare Pro',
      description: 'Integrated healthcare management platform for hospitals and clinics',
      features: ['Patient Management', 'Electronic Health Records', 'Appointment Scheduling', 'Telemedicine']
    },
    {
      icon: '📦',
      name: 'LogiTrack Suite',
      description: 'Advanced logistics and supply chain management platform',
      features: ['Real-time Tracking', 'Route Optimization', 'Inventory Management', 'Analytics Dashboard']
    }
  ];

  ngOnInit() {
    // Add intersection observer for animations
    this.setupAnimations();
  }

  private setupAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, { threshold: 0.1 });

    // Observe all animated elements
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.service-card, .industry-card, .client-card, .platform-card');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);
  }
}