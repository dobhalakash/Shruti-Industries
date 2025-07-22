import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

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
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit, OnDestroy {
  floatingIcons: FloatingIcon[] = [];
  private animationFrame: number = 0;

  private iconTypes = [
    'bi-star-fill',
    'bi-heart-fill',
    'bi-diamond-fill',
    'bi-circle-fill',
    'bi-triangle-fill',
    'bi-square-fill',
    'bi-pentagon-fill',
    'bi-hexagon-fill',
    'bi-gem',
    'bi-lightning-fill'
  ];

  features = [
    {
      icon: 'bi-magic',
      title: 'Amazing Animations',
      description: 'Beautiful and smooth animations that captivate your users'
    },
    {
      icon: 'bi-palette-fill',
      title: 'Modern Design',
      description: 'Clean and contemporary design that stands out'
    },
    {
      icon: 'bi-speedometer2',
      title: 'High Performance',
      description: 'Optimized for speed and efficiency across all devices'
    },
    {
      icon: 'bi-shield-check',
      title: 'Reliable & Secure',
      description: 'Built with security and reliability as top priorities'
    }
  ];

  ngOnInit() {
    this.initializeFloatingIcons();
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
        size: Math.random() * 20 + 10,
        speed: Math.random() * 0.5 + 0.2,
        direction: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        },
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4
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
      icon.x += icon.direction.x * icon.speed;
      icon.y += icon.direction.y * icon.speed;
      icon.rotation += icon.rotationSpeed;

      if (icon.x < -50) icon.x = window.innerWidth + 50;
      if (icon.x > window.innerWidth + 50) icon.x = -50;
      if (icon.y < -50) icon.y = window.innerHeight + 50;
      if (icon.y > window.innerHeight + 50) icon.y = -50;
    });
  }
}
