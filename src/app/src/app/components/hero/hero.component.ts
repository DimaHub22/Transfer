import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements OnInit {
  today = new Date().toISOString().split('T')[0];

  form = {
    from: '',
    to: '',
    date: '',
    time: ''
  };

  badges = [
    { icon: 'fas fa-check-circle', text: 'Встретим с табличкой' },
    { icon: 'fas fa-check-circle', text: 'Фиксированная цена' },
    { icon: 'fas fa-check-circle', text: 'Без предоплаты' },
    { icon: 'fas fa-check-circle', text: '24/7' }
  ];

  stats = [
    { number: '5000+', label: 'Довольных клиентов' },
    { number: '4.9★', label: 'Средний рейтинг' },
    { number: '3 мин', label: 'Подтверждение' },
    { number: '7 лет', label: 'На рынке' }
  ];

  particles: any[] = [];

  ngOnInit() {
    this.generateParticles();
  }

  generateParticles() {
    this.particles = Array.from({ length: 18 }, () => ({
      size: Math.random() * 6 + 2,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${Math.random() * 15 + 10}s`
    }));
  }

  calculatePrice() {
    const { from, to } = this.form;
    if (!from || !to) {
      alert('Пожалуйста, выберите место отправления и назначения');
      return;
    }
    const ctaSection = document.getElementById('booking');
    if (ctaSection) {
      const offset = 80;
      const top = ctaSection.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
