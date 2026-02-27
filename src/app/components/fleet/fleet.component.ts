// import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-fleet',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './fleet.component.html',
//   styleUrl: './fleet.component.scss'
// })
// export class FleetComponent implements AfterViewInit  {
//   @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;
//
//   cars = [
//     {
//       class: 'Эконом',
//       name: 'Эконом',
//       model: 'Kia Rio / аналог',
//       price: '800₽',
//       featured: false,
//       gradient: 'linear-gradient(135deg, #64748b, #475569)',
//       image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80&auto=format&fit=crop',
//       specs: [
//         { icon: 'fas fa-users', text: 'До 3 пассажиров' },
//         { icon: 'fas fa-suitcase', text: '2 чемодана' },
//         { icon: 'fas fa-gas-pump', text: 'Бензин / Газ' }
//       ],
//       features: ['Кондиционер', 'Вода', 'Wi-Fi']
//     },
//     {
//       class: 'Комфорт',
//       name: 'Комфорт',
//       model: 'Toyota Camry / аналог',
//       price: '1 200₽',
//       featured: true,
//       gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
//       image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80&auto=format&fit=crop',
//       specs: [
//         { icon: 'fas fa-users', text: 'До 3 пассажиров' },
//         { icon: 'fas fa-suitcase', text: '3 чемодана' },
//         { icon: 'fas fa-leaf', text: 'Бензин' }
//       ],
//       features: ['Кондиционер', 'Вода', 'Wi-Fi', 'Зарядка USB']
//     },
//     {
//       class: 'Бизнес',
//       name: 'Бизнес',
//       model: 'Mercedes E-Class / аналог',
//       price: '2 000₽',
//       featured: false,
//       gradient: 'linear-gradient(135deg, #d4af37, #b8972e)',
//       image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80&auto=format&fit=crop',
//       specs: [
//         { icon: 'fas fa-users', text: 'До 3 пассажиров' },
//         { icon: 'fas fa-suitcase', text: '3 чемодана' },
//         { icon: 'fas fa-star', text: 'Премиум комфорт' }
//       ],
//       features: ['Кондиционер', 'Вода', 'Wi-Fi', 'Пресса']
//     },
//     {
//       class: 'Минивэн',
//       name: 'Минивэн',
//       model: 'Hyundai H-1 / аналог',
//       price: '1 800₽',
//       featured: false,
//       gradient: 'linear-gradient(135deg, #10b981, #059669)',
//       image: 'https://www.prodrive-shop.com/wp-content/uploads/2017/01/10140_01.jpg',
//       specs: [
//         { icon: 'fas fa-users', text: 'До 7 пассажиров' },
//         { icon: 'fas fa-suitcase', text: '7 чемоданов' },
//         { icon: 'fas fa-child', text: 'Детское кресло' }
//       ],
//       features: ['Кондиционер', 'Вода', 'Wi-Fi', 'Детское кресло']
//     }
//   ];
//
//   ngAfterViewInit() {
//     const observer = new IntersectionObserver(
//       (entries) => entries.forEach(e => {
//         if (e.isIntersecting) e.target.classList.add('visible');
//       }),
//       { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
//     );
//     this.revealElements.forEach(el => observer.observe(el.nativeElement));
//   }
// }

import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarSpec {
  icon: string;
  text: string;
}

interface Car {
  class: string;
  name: string;
  model: string;
  price: string;
  featured: boolean;
  gradient: string;
  images: string[];
  imageLabels?: string[];
  description?: string;
  specs: CarSpec[];
  features: string[];
  activeImage?: number;
}

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  whatsappNumber = '79001234567'; // Замените на ваш номер

  // Массив автомобилей — легко добавлять новые
  cars: Car[] = [
    {
      class: 'Минивэн',
      name: 'WEY 80',
      model: 'Минивэн премиум класса',
      price: '3 000₽',
      featured: true,
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      description: 'Просторный и комфортный минивэн для семейных поездок. Идеален для путешествий с детьми.',
      images: [
        'assets/car/wey_80.webp',
        'assets/car/photo_2026-02-27 19.25.51.webp',
        'assets/car/photo_2026-02-27 19.25.58.webp',
        'assets/car/photo_2026-02-27-19.26.02.webp',
        'assets/car/photo_2026-02-27-19.26.05.webp',
        'assets/car/photo_2026-02-27-19.26.10.webp',
        'assets/car/photo_2026-02-27-19.26.18.webp',
        'assets/car/photo_2026-02-27-19.26.21.webp',
        'assets/car/photo_2026-02-27-19.26.25.webp',
        'assets/car/photo_2026-02-27-19.26.31.webp',
        'assets/car/photo_2026-02-27-19.26.39.webp',
        'assets/car/photo_2026-02-27-19.26.43.webp',
        // 'https://www.prodrive-shop.com/wp-content/uploads/2017/01/10140_01.jpg',
      ],
      // imageLabels: ['Экстерьер', 'Салон', 'Сиденья', 'Багажник'],
      specs: [
        { icon: 'fas fa-users', text: 'До 7 пассажиров' },
        { icon: 'fas fa-suitcase', text: 'До 7 чемоданов' },
        { icon: 'fas fa-snowflake', text: 'Климат-контроль' },
        { icon: 'fas fa-baby', text: 'Детское кресло' }
      ],
      features: [
        'Кондиционер',
        // 'Wi-Fi',
        'USB зарядка',
        'Вода',
        'Детское кресло',
        'Багажник XL'
      ],
      activeImage: 0
    }

    // === Для добавления нового авто скопируйте блок выше ===
    // {
    //   class: 'Комфорт',
    //   name: 'Toyota Camry',
    //   model: 'Бизнес седан',
    //   price: '1 200₽',
    //   featured: false,
    //   gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    //   description: 'Комфортный седан для деловых поездок.',
    //   images: [
    //     'assets/images/fleet/camry-exterior.jpg',
    //     'assets/images/fleet/camry-interior.jpg'
    //   ],
    //   imageLabels: ['Экстерьер', 'Салон'],
    //   specs: [
    //     { icon: 'fas fa-users', text: 'До 3 пассажиров' },
    //     { icon: 'fas fa-suitcase', text: 'До 3 чемоданов' }
    //   ],
    //   features: ['Кондиционер', 'Wi-Fi', 'USB зарядка'],
    //   activeImage: 0
    // }
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

  // Навигация по галерее
  prevImage(car: Car) {
    const current = car.activeImage || 0;
    car.activeImage = current === 0 ? car.images.length - 1 : current - 1;
  }

  nextImage(car: Car) {
    const current = car.activeImage || 0;
    car.activeImage = current === car.images.length - 1 ? 0 : current + 1;
  }

  setActiveImage(car: Car, index: number) {
    car.activeImage = index;
  }

  // Текст для WhatsApp
  getWhatsAppText(car: Car): string {
    return encodeURIComponent(
      `Здравствуйте! Хочу забронировать ${car.name} (${car.class}). Подскажите свободные даты.`
    );
  }
}
