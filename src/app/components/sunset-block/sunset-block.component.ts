import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";

interface Location {
  id: string;
  name: string;
  category?: string;
}

interface OrderData {
  orderNumber: string;  // Добавляем номер заказа
  from: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  hours: number;
  total: number;
}

@Component({
  selector: 'app-sunset-block',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgIf],
  providers: [provideNgxMask()],
  templateUrl: './sunset-block.component.html',
  styleUrls: ['./sunset-block.component.scss']
})
export class SunsetBlockComponent implements OnInit {
  isPopupOpen = false;
  activeTab: 'callback' | 'autojet' = 'callback';

  orderStep: 'form' | 'payment' | 'success' = 'form';
  isSubmitted = false;

  showErrors = false;
  carShowErrors = false;
  paymentShowErrors = false;

  pricePerHour = 2300;
  minDate: string = '';
  timeOptions: string[] = [];

  // Данные заказа с номером
  orderData: OrderData | null = null;

  hoursOptions = Array.from({ length: 24 }, (_, i) => i + 1);

  // Формы
  callForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
  });

  rentCarForm = this.fb.group({
    from: ['', [Validators.required]],
    name: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    hours: [1, [Validators.required]],
  });

  paymentForm = this.fb.group({
    cardNumber: ['', [Validators.required, Validators.minLength(16)]],
    expiry: ['', [Validators.required, Validators.minLength(4)]],
    cvv: ['', [Validators.required, Validators.minLength(3)]],
    cardHolder: ['', [Validators.required]],
  });

  constructor(private fb: NonNullableFormBuilder) {}

  ngOnInit() {
    this.minDate = this.getToday();
    this.generateTimeOptions();

    this.callForm.valueChanges.subscribe(() => {
      this.callForm.invalid ? this.showErrors = true : this.showErrors = false;
    });

    this.rentCarForm.valueChanges.subscribe(() => {

      if(this.rentCarForm.get('from')?.value === 'other'){
        this.activeTab = 'callback';

        const name = this.rentCarForm.get('name')?.value
        const phone = this.rentCarForm.get('phone')?.value

        if(name){
          this.callForm.get('name')?.setValue(name)
        }

        if(phone){
          this.callForm.get('phone')?.setValue(phone)
        }
      }

      this.rentCarForm.invalid ? this.carShowErrors = true :  this.carShowErrors = false
    });

    this.paymentForm.valueChanges.subscribe(() => {
      this.paymentForm.invalid ? this.paymentShowErrors = true : this.paymentShowErrors = false
    });
  }

  getToday(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  generateTimeOptions() {
    this.timeOptions = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += 30) {
        const hour = h.toString().padStart(2, '0');
        const minute = m.toString().padStart(2, '0');
        this.timeOptions.push(`${hour}:${minute}`);
      }
    }
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'short'
    };
    return date.toLocaleDateString('ru-RU', options);
  }

  // Локации
  locations: Location[] = [
    { id: 'airport', name: 'Аэропорт Сочи (Адлер)', category: 'Аэропорты и вокзалы' },
    { id: 'train_adler', name: 'Ж/Д вокзал Адлер', category: 'Аэропорты и вокзалы' },
    { id: 'train_sochi', name: 'Ж/Д вокзал Сочи', category: 'Аэропорты и вокзалы' },
    { id: 'adler_center', name: 'Адлер (центр)', category: 'Адлер' },
    { id: 'olympic_park', name: 'Олимпийский парк', category: 'Адлер' },
    { id: 'sochi_center', name: 'Сочи (центр)', category: 'Сочи' },
    { id: 'krasnaya_polyana', name: 'Красная Поляна', category: 'Горы' },
    { id: 'rosa_khutor', name: 'Роза Хутор', category: 'Горы' },
    { id: 'other', name: 'Другое место', category: 'Другие' }
  ];

  get groupedLocations(): { category: string; items: Location[] }[] {
    const groups: { [key: string]: Location[] } = {};
    this.locations.forEach(loc => {
      const cat = loc.category || 'Другие';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(loc);
    });
    return Object.keys(groups).map(category => ({ category, items: groups[category] }));
  }

  get totalPrice(): number {
    const hours = this.rentCarForm.get('hours')?.value || 1;
    return hours * this.pricePerHour;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('ru-RU') + ' ₽';
  }

  openPopup() {
    this.isPopupOpen = true;
    this.activeTab = 'callback';
    this.orderStep = 'form';
    this.isSubmitted = false;
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.isPopupOpen = false;
    document.body.style.overflow = '';
    this.resetForms();
  }

  switchTab(tab: 'callback' | 'autojet') {
    this.activeTab = tab;
    this.orderStep = 'form';
    this.isSubmitted = false;
    this.showErrors = false;
    this.carShowErrors = false;
  }

  submitCallback() {
    if (this.callForm.invalid) {
      this.showErrors = true;
      return;
    }
    console.log('Обратный звонок:', this.callForm.getRawValue());
    this.isSubmitted = true;
    this.callForm.reset();
  }

  submitAutojet() {
    if (this.rentCarForm.invalid) {
      this.carShowErrors = true;
      return;
    }

    const formData = this.rentCarForm.getRawValue();
    const fromLocation = this.locations.find(l => l.id === formData.from);

    // Создаём данные заказа БЕЗ номера (номер присвоим при оплате)
    this.orderData = {
      orderNumber: '', // Пока пустой
      from: fromLocation?.name || formData.from,
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      hours: formData.hours,
      total: formData.hours * this.pricePerHour
    };

    console.log('Заказ АвтоДжет:', this.orderData);
    this.orderStep = 'payment';
  }

  backToForm() {
    this.orderStep = 'form';
    this.paymentShowErrors = false;
    this.paymentForm.reset();
  }

  submitPayment() {
    if (this.paymentForm.invalid) {
      this.paymentShowErrors = true;
      return;
    }

    // Генерируем номер заказа ОДИН раз при успешной оплате
    if (this.orderData) {
      this.orderData.orderNumber = this.generateOrderNumber();
    }

    console.log('Оплата:', {
      ...this.paymentForm.getRawValue(),
      order: this.orderData
    });

    this.orderStep = 'success';
    this.isSubmitted = true;

    this.rentCarForm.reset({ hours: 1 });
    this.paymentForm.reset();
  }

  getHoursLabel(h: number): string {
    if (h === 1) return '1 час';
    if (h >= 2 && h <= 4) return `${h} часа`;
    return `${h} часов`;
  }

  // Генерация номера заказа - вызывается только при оплате
  private generateOrderNumber(): string {
    return Math.floor(Math.random() * 900000 + 100000).toString();
  }

  private resetForms() {
    this.callForm.reset();
    this.rentCarForm.reset({ hours: 1 });
    this.paymentForm.reset();
    this.showErrors = false;
    this.carShowErrors = false;
    this.paymentShowErrors = false;
    this.orderStep = 'form';
    this.isSubmitted = false;
    this.orderData = null;
  }
}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule, NgIf } from '@angular/common';
// import {
//   FormsModule,
//   NonNullableFormBuilder,
//   ReactiveFormsModule,
//   Validators
// } from '@angular/forms';
// import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
//
// interface Location {
//   id: string;
//   name: string;
//   category?: string;
// }
//
// @Component({
//   selector: 'app-sunset-block',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, NgIf],
//   providers: [provideNgxMask()],
//   templateUrl: './sunset-block.component.html',
//   styleUrls: ['./sunset-block.component.scss']
// })
// export class SunsetBlockComponent implements OnInit {
//   isPopupOpen = false;
//   activeTab: 'callback' | 'autojet' = 'callback';
//
//   orderStep: 'form' | 'payment' | 'success' = 'form';
//   isSubmitted = false;
//
//   showErrors = false;
//   carShowErrors = false;
//   paymentShowErrors = false;
//
//   pricePerHour = 2300;
//
//   // Минимальная дата (сегодня)
//   minDate: string = '';
//
//   // Варианты времени
//   timeOptions: string[] = [];
//
//   orderData: {
//     from: string;
//     name: string;
//     phone: string;
//     date: string;
//     time: string;
//     hours: number;
//     total: number;
//   } | null = null;
//
//   hoursOptions = Array.from({ length: 24 }, (_, i) => i + 1);
//
//   // Формы
//   callForm = this.fb.group({
//     name: ['', [Validators.required]],
//     phone: ['', [Validators.required]],
//   });
//
//   rentCarForm = this.fb.group({
//     from: ['', [Validators.required]],
//     name: ['', [Validators.required]],
//     phone: ['', [Validators.required]],
//     date: ['', [Validators.required]],
//     time: ['', [Validators.required]],
//     hours: [1, [Validators.required]],
//   });
//
//   paymentForm = this.fb.group({
//     cardNumber: ['', [Validators.required, Validators.minLength(16)]],
//     expiry: ['', [Validators.required, Validators.minLength(4)]],
//     cvv: ['', [Validators.required, Validators.minLength(3)]],
//     cardHolder: ['', [Validators.required]],
//   });
//
//   constructor(private fb: NonNullableFormBuilder) {}
//
//   ngOnInit() {
//     // Устанавливаем минимальную дату (сегодня)
//     this.minDate = this.getToday();
//
//     // Генерируем варианты времени (каждые 30 минут)
//     this.generateTimeOptions();
//
//     this.callForm.valueChanges.subscribe(() => {
//       if (this.callForm.invalid) {
//         this.showErrors = true;
//       }else{
//         this.showErrors = false;
//       }
//     });
//
//     this.rentCarForm.valueChanges.subscribe(() => {
//       if (this.rentCarForm.invalid) {
//         this.carShowErrors = true;
//       }else{
//         this.carShowErrors = false;
//       }
//
//     });
//
//     this.paymentForm.valueChanges.subscribe(() => {
//       if (this.paymentForm.invalid) {
//         this.paymentShowErrors = true;
//       }else{
//         this.paymentShowErrors = false;
//       }
//     });
//   }
//
//   // Получить сегодняшнюю дату в формате YYYY-MM-DD
//   getToday(): string {
//     const today = new Date();
//     return today.toISOString().split('T')[0];
//   }
//
//   // Генерация вариантов времени
//   generateTimeOptions() {
//     this.timeOptions = [];
//     for (let h = 0; h < 24; h++) {
//       for (let m = 0; m < 60; m += 30) {
//         const hour = h.toString().padStart(2, '0');
//         const minute = m.toString().padStart(2, '0');
//         this.timeOptions.push(`${hour}:${minute}`);
//       }
//     }
//   }
//
//   // Форматирование даты для отображения
//   formatDate(dateStr: string): string {
//     if (!dateStr) return '';
//     const date = new Date(dateStr);
//     const options: Intl.DateTimeFormatOptions = {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric',
//       weekday: 'short'
//     };
//     return date.toLocaleDateString('ru-RU', options);
//   }
//
//   // Локации
//   locations: Location[] = [
//     { id: 'airport', name: 'Аэропорт Сочи (Адлер)', category: 'Аэропорты и вокзалы' },
//     { id: 'train_adler', name: 'Ж/Д вокзал Адлер', category: 'Аэропорты и вокзалы' },
//     { id: 'train_sochi', name: 'Ж/Д вокзал Сочи', category: 'Аэропорты и вокзалы' },
//     { id: 'adler_center', name: 'Адлер (центр)', category: 'Адлер' },
//     { id: 'olympic_park', name: 'Олимпийский парк', category: 'Адлер' },
//     { id: 'sochi_center', name: 'Сочи (центр)', category: 'Сочи' },
//     { id: 'krasnaya_polyana', name: 'Красная Поляна', category: 'Горы' },
//     { id: 'rosa_khutor', name: 'Роза Хутор', category: 'Горы' },
//     { id: 'other', name: 'Другое место', category: 'Другие' }
//   ];
//
//   get groupedLocations(): { category: string; items: Location[] }[] {
//     const groups: { [key: string]: Location[] } = {};
//     this.locations.forEach(loc => {
//       const cat = loc.category || 'Другие';
//       if (!groups[cat]) groups[cat] = [];
//       groups[cat].push(loc);
//     });
//     return Object.keys(groups).map(category => ({ category, items: groups[category] }));
//   }
//
//   get totalPrice(): number {
//     const hours = this.rentCarForm.get('hours')?.value || 1;
//     return hours * this.pricePerHour;
//   }
//
//   formatPrice(price: number): string {
//     return price.toLocaleString('ru-RU') + ' ₽';
//   }
//
//   openPopup() {
//     this.isPopupOpen = true;
//     this.activeTab = 'callback';
//     this.orderStep = 'form';
//     this.isSubmitted = false;
//     document.body.style.overflow = 'hidden';
//   }
//
//   closePopup() {
//     this.isPopupOpen = false;
//     document.body.style.overflow = '';
//     this.resetForms();
//   }
//
//   switchTab(tab: 'callback' | 'autojet') {
//     this.activeTab = tab;
//     this.orderStep = 'form';
//     this.isSubmitted = false;
//     this.showErrors = false;
//     this.carShowErrors = false;
//   }
//
//   submitCallback() {
//     if (this.callForm.invalid) {
//       this.showErrors = true;
//       return;
//     }
//     console.log('Обратный звонок:', this.callForm.getRawValue());
//     this.isSubmitted = true;
//     this.callForm.reset();
//   }
//
//   submitAutojet() {
//     if (this.rentCarForm.invalid) {
//       this.carShowErrors = true;
//       return;
//     }
//
//     const formData = this.rentCarForm.getRawValue();
//     const fromLocation = this.locations.find(l => l.id === formData.from);
//
//     this.orderData = {
//       from: fromLocation?.name || formData.from,
//       name: formData.name,
//       phone: formData.phone,
//       date: formData.date,
//       time: formData.time,
//       hours: formData.hours,
//       total: formData.hours * this.pricePerHour
//     };
//
//     console.log('Заказ АвтоДжет:', this.orderData);
//     this.orderStep = 'payment';
//   }
//
//   backToForm() {
//     this.orderStep = 'form';
//     this.paymentShowErrors = false;
//     this.paymentForm.reset();
//   }
//
//   submitPayment() {
//     if (this.paymentForm.invalid) {
//       this.paymentShowErrors = true;
//       return;
//     }
//
//     console.log('Оплата:', {
//       ...this.paymentForm.getRawValue(),
//       order: this.orderData
//     });
//
//     this.orderStep = 'success';
//     this.isSubmitted = true;
//
//     this.rentCarForm.reset({ hours: 1 });
//     this.paymentForm.reset();
//   }
//
//   getHoursLabel(h: number): string {
//     if (h === 1) return '1 час';
//     if (h >= 2 && h <= 4) return `${h} часа`;
//     return `${h} часов`;
//   }
//
//   // Генерация номера заказа
//   generateOrderNumber(): string {
//     return Math.floor(Math.random() * 900000 + 100000).toString();
//   }
//
//   private resetForms() {
//     this.callForm.reset();
//     this.rentCarForm.reset({ hours: 1 });
//     this.paymentForm.reset();
//     this.showErrors = false;
//     this.carShowErrors = false;
//     this.paymentShowErrors = false;
//     this.orderStep = 'form';
//     this.isSubmitted = false;
//     this.orderData = null;
//   }
// }
//













