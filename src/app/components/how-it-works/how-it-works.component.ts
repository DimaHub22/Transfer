import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  steps = [
    {
      number: '01',
      icon: 'fas fa-mobile-alt',
      title: 'Оставляете заявку',
      description: 'Заполните форму на сайте или закажите обратный звонок',
      highlight: 'Через сайт или месенджер',
      gradient: 'linear-gradient(135deg, #d4af37, #b8972e)'
    },
    {
      number: '02',
      icon: 'fas fa-check-double',
      title: 'Получаете подтверждение',
      description: 'Мы перезвоним или ответим в мессенджер с точной ценой и данными водителя',
      highlight: 'За 5 минут',
      gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)'
    },
    {
      number: '03',
      icon: 'fas fa-id-badge',
      title: 'Водитель встречает вас',
      description: 'Ваш водитель будет ждать с именной табличкой прямо у выхода из зоны прилёта',
      highlight: 'С именной табличкой',
      gradient: 'linear-gradient(135deg, #7c3aed, #4f46e5)'
    },
    {
      number: '04',
      icon: 'fas fa-couch',
      title: 'Едете с комфортом',
      description: 'Расслабьтесь — чистый автомобиль, кондиционер, вода и Wi-Fi уже ждут вас',
      highlight: 'Без стресса',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
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
