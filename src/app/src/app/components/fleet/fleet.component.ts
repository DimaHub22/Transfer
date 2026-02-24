import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss'
})
export class FleetComponent implements AfterViewInit  {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  cars = [
    {
      class: 'Эконом',
      name: 'Эконом',
      model: 'Kia Rio / аналог',
      price: '800₽',
      featured: false,
      gradient: 'linear-gradient(135deg, #64748b, #475569)',
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80&auto=format&fit=crop',
      specs: [
        { icon: 'fas fa-users', text: 'До 3 пассажиров' },
        { icon: 'fas fa-suitcase', text: '2 чемодана' },
        { icon: 'fas fa-gas-pump', text: 'Бензин / Газ' }
      ],
      features: ['Кондиционер', 'Вода', 'Wi-Fi']
    },
    {
      class: 'Комфорт',
      name: 'Комфорт',
      model: 'Toyota Camry / аналог',
      price: '1 200₽',
      featured: true,
      gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80&auto=format&fit=crop',
      specs: [
        { icon: 'fas fa-users', text: 'До 3 пассажиров' },
        { icon: 'fas fa-suitcase', text: '3 чемодана' },
        { icon: 'fas fa-leaf', text: 'Бензин' }
      ],
      features: ['Кондиционер', 'Вода', 'Wi-Fi', 'Зарядка USB']
    },
    {
      class: 'Бизнес',
      name: 'Бизнес',
      model: 'Mercedes E-Class / аналог',
      price: '2 000₽',
      featured: false,
      gradient: 'linear-gradient(135deg, #d4af37, #b8972e)',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80&auto=format&fit=crop',
      specs: [
        { icon: 'fas fa-users', text: 'До 3 пассажиров' },
        { icon: 'fas fa-suitcase', text: '3 чемодана' },
        { icon: 'fas fa-star', text: 'Премиум комфорт' }
      ],
      features: ['Кондиционер', 'Вода', 'Wi-Fi', 'Пресса']
    },
    {
      class: 'Минивэн',
      name: 'Минивэн',
      model: 'Hyundai H-1 / аналог',
      price: '1 800₽',
      featured: false,
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      image: 'https://www.prodrive-shop.com/wp-content/uploads/2017/01/10140_01.jpg',
      specs: [
        { icon: 'fas fa-users', text: 'До 7 пассажиров' },
        { icon: 'fas fa-suitcase', text: '7 чемоданов' },
        { icon: 'fas fa-child', text: 'Детское кресло' }
      ],
      features: ['Кондиционер', 'Вода', 'Wi-Fi', 'Детское кресло']
    }
  ];

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    this.revealElements.forEach(el => observer.observe(el.nativeElement));
  }
}
