import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="about-container">
      <!-- Hero Section -->
      <section class="about-hero">
        <div class="container">
          <h1 class="hero-title fade-in-up">About TechLogistics</h1>
          <p class="hero-subtitle fade-in-up delay-1">
            Pioneering innovation across technology, healthcare, education, and logistics since 2002
          </p>
        </div>
      </section>

      <!-- Mission & Vision -->
      <section class="mission-section">
        <div class="container">
          <div class="mission-grid">
            <div class="mission-card fade-in-left">
              <div class="card-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To empower organizations worldwide through innovative technology solutions that transform industries and improve lives across healthcare, education, and logistics sectors.</p>
            </div>
            <div class="mission-card fade-in-right">
              <div class="card-icon">🌟</div>
              <h3>Our Vision</h3>
              <p>To be the global leader in cross-industry digital transformation, setting new standards for innovation in technology, healthcare, education, and logistics.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Journey Timeline -->
      <section class="journey-section">
        <div class="container">
          <h2 class="section-title">Our Journey</h2>
          <div class="timeline">
            <div class="timeline-item" *ngFor="let milestone of milestones; let i = index"
                 [class.left]="i % 2 === 0" [class.right]="i % 2 === 1">
              <div class="timeline-content">
                <div class="year">{{ milestone.year }}</div>
                <h3>{{ milestone.title }}</h3>
                <p>{{ milestone.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Technology Domains -->
      <section class="tech-domains-section">
        <div class="container">
          <h2 class="section-title">Technology Domains</h2>
          <div class="domains-grid">
            <div class="domain-card" *ngFor="let domain of techDomains; let i = index"
                 [style.animation-delay]="i * 0.1 + 's'">
              <div class="domain-header">
                <div class="domain-icon">{{ domain.icon }}</div>
                <h3>{{ domain.name }}</h3>
              </div>
              <p>{{ domain.description }}</p>
              <div class="tech-stack">
                <span *ngFor="let tech of domain.technologies" class="tech-tag">{{ tech }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Education Initiatives -->
      <section class="education-section">
        <div class="container">
          <h2 class="section-title">Education Initiatives</h2>
          <div class="education-grid">
            <div class="education-card" *ngFor="let initiative of educationInitiatives; let i = index"
                 [style.animation-delay]="i * 0.15 + 's'">
              <div class="card-image">{{ initiative.icon }}</div>
              <div class="card-content">
                <h3>{{ initiative.title }}</h3>
                <p>{{ initiative.description }}</p>
                <ul>
                  <li *ngFor="let feature of initiative.features">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Founder Message -->
      <section class="founder-section">
        <div class="container">
          <div class="founder-card">
            <div class="quote-icon">"</div>
            <blockquote>
              "Our journey from a small technology startup in 2002 to a multi-industry innovation leader 
              has been driven by one constant: the belief that technology should serve humanity's greatest needs. 
              Whether it's revolutionizing healthcare delivery, transforming education accessibility, 
              or optimizing global logistics, we remain committed to creating solutions that matter."
            </blockquote>
            <div class="founder-info">
              <div class="founder-avatar">JD</div>
              <div>
                <h4>John Doe</h4>
                <p>Founder & CEO</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./dispaly.scss']
})
export class Dispaly implements OnInit {
  milestones = [
    {
      year: '2002',
      title: 'Foundation',
      description: 'Started as a technology consulting firm with a focus on enterprise solutions'
    },
    {
      year: '2007',
      title: 'Logistics Expansion',
      description: 'Expanded into logistics technology, developing our first supply chain management platform'
    },
    {
      year: '2012',
      title: 'Healthcare Innovation',
      description: 'Launched healthcare technology division, creating patient management systems'
    },
    {
      year: '2016',
      title: 'Education Technology',
      description: 'Entered education sector with comprehensive LMS and e-learning solutions'
    },
    {
      year: '2020',
      title: 'AI Integration',
      description: 'Integrated artificial intelligence across all our platforms and services'
    },
    {
      year: '2023',
      title: 'Quantum Research',
      description: 'Established quantum computing research division for next-generation solutions'
    }
  ];

  techDomains = [
    {
      icon: '☁️',
      name: 'Cloud Computing',
      description: 'Scalable cloud infrastructure and microservices architecture for modern applications',
      technologies: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Serverless']
    },
    {
      icon: '🤖',
      name: 'Artificial Intelligence',
      description: 'Machine learning and AI solutions for predictive analytics and automation',
      technologies: ['TensorFlow', 'PyTorch', 'OpenAI', 'Computer Vision', 'NLP']
    },
    {
      icon: '📱',
      name: 'Mobile Development',
      description: 'Cross-platform mobile applications for iOS and Android platforms',
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Ionic']
    },
    {
      icon: '🌐',
      name: 'Web Technologies',
      description: 'Modern web applications using cutting-edge frameworks and technologies',
      technologies: ['Angular', 'React', 'Vue.js', 'Node.js', 'TypeScript']
    },
    {
      icon: '🔒',
      name: 'Cybersecurity',
      description: 'Advanced security solutions and compliance frameworks for enterprise protection',
      technologies: ['Zero Trust', 'SIEM', 'Encryption', 'Penetration Testing', 'Compliance']
    },
    {
      icon: '⚛️',
      name: 'Quantum Computing',
      description: 'Research and development in quantum algorithms and quantum-safe cryptography',
      technologies: ['Qiskit', 'Cirq', 'Quantum ML', 'Cryptography', 'Optimization']
    }
  ];

  educationInitiatives = [
    {
      icon: '🎓',
      title: 'TechLogistics LMS',
      description: 'Comprehensive learning management system with AI-powered personalization',
      features: ['Interactive Learning Paths', 'Real-time Analytics', 'Virtual Laboratories', 'Certification Management']
    },
    {
      icon: '👨‍💻',
      title: 'Coding Bootcamps',
      description: 'Intensive programming bootcamps for career transition and skill development',
      features: ['Full-Stack Development', 'Data Science', 'DevOps Engineering', 'Career Placement Support']
    },
    {
      icon: '🌉',
      title: 'Bridge Programs',
      description: 'Educational bridge programs connecting traditional education with industry needs',
      features: ['Industry Partnerships', 'Mentorship Programs', 'Practical Projects', 'Soft Skills Development']
    }
  ];

  ngOnInit() {
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

    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.domain-card , .timeline-item');
      animatedElements.forEach(el => observer.observe(el));
    }, 100);
  }
}