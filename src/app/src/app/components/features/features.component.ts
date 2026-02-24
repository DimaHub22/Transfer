import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  features = [
    {
      icon: 'fas fa-tag',
      title: 'Фиксированная цена без сюрпризов',
      description: 'Цена оговаривается заранее и не меняется. Никаких надбавок за пробки, ожидание или поздний час.',
      gradient: 'linear-gradient(135deg, #d4af37, #b8972e)'
    },
    {
      icon: 'fas fa-id-card',
      title: 'Встреча с табличкой в аэропорту',
      description: 'Водитель встретит вас в зоне прилёта с именной табличкой. Вы сразу нас увидите.',
      gradient: 'linear-gradient(135deg, #1a365d, #2563eb)'
    },
    {
      icon: 'fas fa-satellite-dish',
      title: 'Отслеживание рейса',
      description: 'Автоматически отслеживаем статус вашего рейса. Задержка? Водитель уже знает и скорректировал прибытие.',
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)'
    },
    {
      icon: 'fas fa-baby-carriage',
      title: 'Детские кресла бесплатно',
      description: 'Кресла для детей от 0 до 12 лет предоставляются бесплатно. Укажите возраст при бронировании.',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    },
    {
      icon: 'fas fa-wifi',
      title: 'Кондиционер, вода, Wi-Fi',
      description: 'В каждом автомобиле чистая питьевая вода, работающий кондиционер и бесплатный Wi-Fi.',
      gradient: 'linear-gradient(135deg, #0ea5e9, #0284c7)'
    },
    {
      icon: 'fas fa-star',
      title: 'Опытные вежливые водители',
      description: 'Все водители проверены, знают каждый маршрут в регионе и помогут с любым вопросом.',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)'
    }
  ];

  ngAfterViewInit() {
    this.initReveal();
  }

  initReveal() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.revealElements.forEach(el => {
      observer.observe(el.nativeElement);
    });
  }

}
