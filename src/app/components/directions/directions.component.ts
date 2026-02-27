import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-directions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './directions.component.html',
  styleUrl: './directions.component.scss'
})
export class DirectionsComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  routes = [
    {
      from: 'Аэропорт Сочи',
      to: 'Адлер',
      distance: '5 км',
      time: '~15 мин',
      highlight: false,
      prices: [
        // { class: 'Эконом', amount: 'от 800₽' },
        // { class: 'Комфорт', amount: 'от 1 000₽' },
        { class: 'Бизнес', amount: 'от 1 500₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Олимпийский парк',
      distance: '10 км',
      time: '~20 мин',
      highlight: false,
      prices: [
        // { class: 'Эконом', amount: 'от 600₽' },
        // { class: 'Комфорт', amount: 'от 900₽' },
        { class: 'Бизнес', amount: 'от 1 400₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Центр Сочи',
      distance: '30 км',
      time: '~40 мин',
      highlight: false,
      prices: [
        // { class: 'Эконом', amount: 'от 1 200₽' },
        // { class: 'Комфорт', amount: 'от 1 600₽' },
        { class: 'Бизнес', amount: 'от 2 400₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Красная Поляна',
      distance: '60 км',
      time: '~60 мин',
      highlight: false,
      prices: [
        // { class: 'Эконом', amount: 'от 1 500₽' },
        // { class: 'Комфорт', amount: 'от 2 000₽' },
        { class: 'Бизнес', amount: 'от 3 000₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Роза Хутор',
      distance: '70 км',
      time: '~70 мин',
      highlight: false,
      prices: [
        // { class: 'Эконом', amount: 'от 1 800₽' },
        // { class: 'Комфорт', amount: 'от 2 400₽' },
        { class: 'Бизнес', amount: 'от 3 500₽' }
      ]
    },
    {
      from: 'Аэропорт Сочи',
      to: 'Лазаревское',
      distance: '90 км',
      time: '~90 мин',
      highlight: false,
      prices: [
        // { class: 'Эконом', amount: 'от 2 500₽' },
        // { class: 'Комфорт', amount: 'от 3 200₽' },
        { class: 'Бизнес', amount: 'от 4 500₽' }
      ]
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
