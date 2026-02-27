import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  today = new Date().toISOString().split('T')[0];
  submitted = false;

  ctaForm = {
    name: '',
    phone: '',
    from: '',
    to: '',
    date: '',
    passengers: '1',
    comment: ''
  };

  guarantees = [
    { icon: 'fas fa-shield-alt',    text: 'Безопасность и страховка пассажиров' },
    { icon: 'fas fa-tag',           text: 'Фиксированная цена без скрытых платежей' },
    { icon: 'fas fa-headset',       text: 'Поддержка 24/7 на протяжении всей поездки' },
    { icon: 'fas fa-undo',          text: 'Бесплатная отмена за 12 часов до поездки' }
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

  submitForm() {
    if (!this.ctaForm.name || !this.ctaForm.phone || !this.ctaForm.from || !this.ctaForm.to) {
      alert('Пожалуйста, заполните обязательные поля');
      return;
    }
    // Simulate form submission
    setTimeout(() => { this.submitted = true; }, 300);
  }
}
