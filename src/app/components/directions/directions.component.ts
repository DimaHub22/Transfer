import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {ScrollLockService} from "../../services/scroll-lock.service";

interface RoutePrice {
  class: string;
  amount: string;
}

interface Route {
  from: string;
  to: string;
  distance: string;
  time: string;
  highlight: boolean;
  prices: RoutePrice[];
}

interface BookingForm {
  name: string;
  phone: string;
  date: string;
  time: string;
  passengers: string;
  carClass: string;
  comment: string;
}

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.scss']
})
export class DirectionsComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  // Popup state
  isPopupOpen = false;
  activeTab: 'booking' | 'payment' = 'booking';
  bookingComplete = false;
  paymentComplete = false;
  payLaterComplete = false;
  isLoading = false;
  submitted = false;
  orderNumber = '';
  minDate = '';

  // Selected route
  selectedRoute: Route | null = null;

  // Booking form
  bookingForm: BookingForm = {
    name: '',
    phone: '',
    date: '',
    time: '',
    passengers: '1',
    carClass: '',
    comment: ''
  };

  routes: Route[] = [
    {
      from: 'Аэропорт Сочи',
      to: 'Адлер',
      distance: '5 км',
      time: '~15 мин',
      highlight: false,
      prices: [
        { class: 'Бизнес', amount: '2 500₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Олимпийский парк',
      distance: '10 км',
      time: '~20 мин',
      highlight: false,
      prices: [
        { class: 'Бизнес', amount: '2 300₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Центр Сочи',
      distance: '30 км',
      time: '~40 мин',
      highlight: false,
      prices: [
        { class: 'Бизнес', amount: '5 500₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Красная Поляна',
      distance: '60 км',
      time: '~60 мин',
      highlight: false,
      prices: [
        { class: 'Бизнес', amount: '6 000₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Роза Хутор',
      distance: '70 км',
      time: '~70 мин',
      highlight: false,
      prices: [
        { class: 'Бизнес', amount: '6 500₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Лазаревское',
      distance: '90 км',
      time: '~90 мин',
      highlight: false,
      prices: [
        { class: 'Бизнес', amount: '15 000₽' }
      ]
    }
  ];

  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private scrollLockService: ScrollLockService) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.setMinDate();
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible');
        }),
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );
      this.revealElements.forEach(el => observer.observe(el.nativeElement));
    }
  }

  /**
   * Установка минимальной даты (сегодня)
   */
  private setMinDate(): void {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }

  /**
   * Генерация номера заказа
   */
  private generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `TR-${timestamp}-${random}`;
  }

  /**
   * Открытие попапа с выбранным маршрутом
   */
  openBookingPopup(route: Route): void {
    this.selectedRoute = route;
    this.isPopupOpen = true;
    this.activeTab = 'booking';
    this.bookingComplete = false;
    this.paymentComplete = false;
    this.payLaterComplete = false;
    this.submitted = false;
    this.scrollLockService.lock();

    // Устанавливаем класс авто по умолчанию
    if (route.prices.length > 0) {
      this.bookingForm.carClass = route.prices[0].class;
    }

    // Блокируем скролл body
    if (this.isBrowser) {
      // document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const popup = document.querySelector('.popup-overlay');
        if (popup instanceof HTMLElement) {
          popup.focus();
        }
      }, 100);
    }
  }

  /**
   * Закрытие попапа
   */
  closePopup(event: Event): void {
    event.stopPropagation();
    this.isPopupOpen = false;
    this.resetForm();

    // Разблокируем скролл body
    if (this.isBrowser) {
      this.scrollLockService.unlock();
      // document.body.style.overflow = '';
    }
  }
  /**
   * Закрытие по клику на overlay
   */
  onOverlayClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.classList.contains('popup-overlay')) {
      this.closePopup(event);
    }
  }

  /**
   * Закрытие по Escape
   */
  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isPopupOpen) {
      this.closePopup(event);
    }
  }

  /**
   * ВАЖНО: Разблокировать скролл при уничтожении компонента
   */
  ngOnDestroy(): void {
    if (this.isPopupOpen) {
      this.scrollLockService.forceUnlock();
    }
  }
  /**
   * Сброс формы
   */
  private resetForm(): void {
    this.bookingForm = {
      name: '',
      phone: '',
      date: '',
      time: '',
      passengers: '1',
      carClass: '',
      comment: ''
    };
    this.submitted = false;
    this.bookingComplete = false;
    this.paymentComplete = false;
    this.payLaterComplete = false;
    this.selectedRoute = null;
  }

  /**
   * Получение выбранного класса авто
   */
  getSelectedPriceClass(): string {
    if (!this.selectedRoute) return '';

    if (this.selectedRoute.prices.length === 1) {
      return this.selectedRoute.prices[0].class;
    }

    return this.bookingForm.carClass || this.selectedRoute.prices[0].class;
  }

  /**
   * Получение цены выбранного класса
   */
  getSelectedPrice(): string {
    if (!this.selectedRoute) return '';

    if (this.selectedRoute.prices.length === 1) {

      return this.selectedRoute.prices[0].amount;
    }

    const selectedPrice = this.selectedRoute.prices.find(
      p => p.class === this.bookingForm.carClass
    );

    return selectedPrice?.amount || this.selectedRoute.prices[0].amount;
  }

  /**
   * Отправка формы бронирования
   */
  submitBooking(): void {
    this.submitted = true;

    // Валидация
    if (!this.bookingForm.name || !this.bookingForm.phone ||
      !this.bookingForm.date || !this.bookingForm.time) {
      return;
    }

    this.isLoading = true;

    // Имитация запроса на сервер
    setTimeout(() => {
      this.orderNumber = this.generateOrderNumber();
      this.bookingComplete = true;
      this.activeTab = 'payment';
      this.isLoading = false;

      console.log('Booking submitted:', {
        route: this.selectedRoute,
        form: this.bookingForm,
        orderNumber: this.orderNumber
      });
    }, 1500);
  }

  /**
   * Обработка оплаты
   */
  processPayment(): void {
    this.isLoading = true;

    // Имитация обработки платежа
    setTimeout(() => {
      this.paymentComplete = true;
      this.isLoading = false;

      console.log('Payment processed:', {
        orderNumber: this.orderNumber,
        amount: this.getSelectedPrice()
      });
    }, 2000);
  }

  /**
   * Оплата позже
   */
  payLater(): void {
    this.payLaterComplete = true;

    console.log('Pay later selected:', {
      orderNumber: this.orderNumber
    });
  }
}






// import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
// import { CommonModule } from '@angular/common';
//
// @Component({
//   selector: 'app-directions',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './directions.component.html',
//   styleUrl: './directions.component.scss'
// })
// export class DirectionsComponent implements AfterViewInit {
//   @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;
//
//   routes = [
//     {
//       from: 'Аэропорт Сочи',
//       to: 'Адлер',
//       distance: '5 км',
//       time: '~15 мин',
//       highlight: false,
//       prices: [
//         // { class: 'Эконом', amount: 'от 800₽' },
//         // { class: 'Комфорт', amount: 'от 1 000₽' },
//         { class: 'Бизнес', amount: 'от 2 500₽' }
//       ]
//     },
//     {
//       from: 'Аэропорт Сочи',
//       to: 'Олимпийский парк',
//       distance: '10 км',
//       time: '~20 мин',
//       highlight: false,
//       prices: [
//         // { class: 'Эконом', amount: 'от 600₽' },
//         // { class: 'Комфорт', amount: 'от 900₽' },
//         { class: 'Бизнес', amount: 'от 2 300₽' }
//       ]
//     },
//     {
//       from: 'Аэропорт Сочи',
//       to: 'Центр Сочи',
//       distance: '30 км',
//       time: '~40 мин',
//       highlight: false,
//       prices: [
//         // { class: 'Эконом', amount: 'от 1 200₽' },
//         // { class: 'Комфорт', amount: 'от 1 600₽' },
//         { class: 'Бизнес', amount: 'от 5 500₽' }
//       ]
//     },
//     {
//       from: 'Аэропорт Сочи',
//       to: 'Красная Поляна',
//       distance: '60 км',
//       time: '~60 мин',
//       highlight: false,
//       prices: [
//         // { class: 'Эконом', amount: 'от 1 500₽' },
//         // { class: 'Комфорт', amount: 'от 2 000₽' },
//         { class: 'Бизнес', amount: 'от 6 000₽' }
//       ]
//     },
//     {
//       from: 'Аэропорт Сочи',
//       to: 'Роза Хутор',
//       distance: '70 км',
//       time: '~70 мин',
//       highlight: false,
//       prices: [
//         // { class: 'Эконом', amount: 'от 1 800₽' },
//         // { class: 'Комфорт', amount: 'от 2 400₽' },
//         { class: 'Бизнес', amount: 'от 6 500₽' }
//       ]
//     },
//     {
//       from: 'Аэропорт Сочи',
//       to: 'Лазаревское',
//       distance: '90 км',
//       time: '~90 мин',
//       highlight: false,
//       prices: [
//         // { class: 'Эконом', amount: 'от 2 500₽' },
//         // { class: 'Комфорт', amount: 'от 3 200₽' },
//         { class: 'Бизнес', amount: 'от 15 000₽' }
//       ]
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
