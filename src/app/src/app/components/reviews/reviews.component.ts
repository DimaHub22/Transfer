import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements AfterViewInit, OnDestroy  {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  activeIndex = 0;
  autoplayInterval: any;

  get prevIndex() {
    return (this.activeIndex - 1 + this.reviews.length) % this.reviews.length;
  }
  get nextIndex() {
    return (this.activeIndex + 1) % this.reviews.length;
  }

  ratingBars = [
    { label: '5 ★', percent: 91, count: '4 550' },
    { label: '4 ★', percent: 7,  count: '350'   },
    { label: '3 ★', percent: 1,  count: '50'    },
    { label: '2 ★', percent: 0.5, count: '25'   },
    { label: '1 ★', percent: 0.5, count: '25'   }
  ];

  platforms = [
    { icon: 'fab fa-google',   color: '#ea4335', name: 'Google',   rating: '4.9' },
    { icon: 'fab fa-yandex',   color: '#fc3f1d', name: 'Яндекс',   rating: '4.8' },
    { icon: '2gis',            color: '#00b956', name: '2ГИС',     rating: '4.9' }
  ];

  reviewStats = [
    {
      icon: 'fas fa-users',
      number: '5 000+',
      label: 'Довольных клиентов',
      gradient: 'linear-gradient(135deg, #1a365d, #2563eb)'
    },
    {
      icon: 'fas fa-star',
      number: '4.9 / 5',
      label: 'Средний рейтинг',
      gradient: 'linear-gradient(135deg, #d4af37, #b8972e)'
    },
    {
      icon: 'fas fa-thumbs-up',
      number: '98%',
      label: 'Рекомендуют нас',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: 'fas fa-redo',
      number: '73%',
      label: 'Возвращаются снова',
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)'
    }
  ];

  reviews = [
    {
      name: 'Анна Смирнова',
      route: 'Аэропорт Сочи → Роза Хутор',
      date: '15 марта 2025',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
      text: 'Заказывала трансфер на семью из 4 человек с детским креслом. Водитель Дмитрий встретил нас прямо у выхода с табличкой, помог с чемоданами. Машина чистая, прохладная, дети сразу уснули. Доехали быстро и комфортно. Однозначно буду заказывать снова!',
      tags: ['Детское кресло', 'Пунктуальность', 'Чистый автомобиль'],
      carClass: 'Минивэн'
    },
    {
      name: 'Михаил Кузнецов',
      route: 'Аэропорт Сочи → Красная Поляна',
      date: '2 апреля 2025',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
      text: 'Отличный сервис! Рейс задержали на 2 часа, написал в WhatsApp — сказали, что всё знают и водитель уже в курсе. В итоге всё прошло гладко, никакого ожидания, никакой паники. Цена — как договаривались, ни рубля больше. Рекомендую!',
      tags: ['Отслеживание рейса', 'Фиксированная цена', 'Оперативность'],
      carClass: 'Комфорт'
    },
    {
      name: 'Елена Петрова',
      route: 'Аэропорт Сочи → Центр Сочи',
      date: '20 апреля 2025',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
      text: 'Приехала в Сочи первый раз и немного переживала. Но всё прошло идеально! Водитель встретил у выхода, провёл к машине, рассказал про город. Предложил воду. До отеля доехали быстро, обходя пробки по знакомым маршрутам. Уже записалась на обратный трансфер!',
      tags: ['Вежливость', 'Знание маршрутов', 'Комфорт'],
      carClass: 'Комфорт'
    },
    {
      name: 'Сергей Волков',
      route: 'Аэропорт Сочи → Адлер',
      date: '5 мая 2025',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
      text: 'Бизнес-класс оправдал каждый рубль. Кожаный салон, тихо, прохладно, бутылочка воды. Водитель вёл аккуратно и профессионально. Добрались за 20 минут. Буду использовать для всех командировок в Сочи.',
      tags: ['Бизнес-класс', 'Профессионализм', 'Скорость'],
      carClass: 'Бизнес'
    },
    {
      name: 'Ольга Новикова',
      route: 'Аэропорт Сочи → Лазаревское',
      date: '12 мая 2025',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
      text: 'Заказывала минивэн для компании из 6 человек. Все уместились с багажом! Дорога до Лазаревского — больше часа, но было очень комфортно. Кондиционер работал на ура, водитель включил приятную музыку. Спасибо за отличный сервис!',
      tags: ['Вместительность', 'Длинный маршрут', 'Комфорт'],
      carClass: 'Минивэн'
    },
    {
      name: 'Дмитрий Иванов',
      route: 'Аэропорт Сочи → Олимпийский парк',
      date: '18 мая 2025',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&q=80&auto=format&fit=crop&crop=face',
      text: 'Быстро и по делу. Написал в WhatsApp, за 3 минуты подтвердили бронь. Утром водитель уже стоял с табличкой. Доехали быстро, цена совпала с той, что назвали заранее. Всё чётко, без лишних слов. Рекомендую!',
      tags: ['Быстрое бронирование', 'Пунктуальность', 'Честная цена'],
      carClass: 'Эконом'
    }
  ];

  ngAfterViewInit() {
    this.startAutoplay();
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    this.revealElements.forEach(el => observer.observe(el.nativeElement));
  }

  ngOnDestroy() {
    this.stopAutoplay();
  }

  startAutoplay() {
    // this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) clearInterval(this.autoplayInterval);
  }

  nextSlide() {
    this.activeIndex = (this.activeIndex + 1) % this.reviews.length;
  }

  prevSlide() {
    this.activeIndex = (this.activeIndex - 1 + this.reviews.length) % this.reviews.length;
    this.stopAutoplay();
    this.startAutoplay();
  }

  goToSlide(index: number) {
    this.activeIndex = index;
    this.stopAutoplay();
    this.startAutoplay();
  }
}
