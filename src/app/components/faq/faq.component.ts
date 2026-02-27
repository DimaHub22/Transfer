import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;
  openIndex = 0;
  faqItems = [
    {
      icon: 'fas fa-credit-card',
      question: 'Как оплатить поездку?',
      answer: 'Оплата производится наличными водителю по приезду на место назначения или банковской картой онлайн при бронировании через сайт. Мы принимаем все основные карты: Visa, MasterCard, МИР. Никакой предоплаты не требуется.',
      highlight: 'Без предоплаты — платите по факту поездки'
    },
    {
      icon: 'fas fa-plane-arrival',
      question: 'Что если мой рейс задержится?',
      answer: 'Мы автоматически отслеживаем статус каждого рейса в режиме реального времени. Если самолёт задерживается, водитель скорректирует время прибытия в аэропорт. Ожидание до 60 минут после приземления — бесплатно. Вам не нужно ни о чём беспокоиться.',
      highlight: 'Бесплатное ожидание до 60 минут при задержке рейса'
    },
    {
      icon: 'fas fa-baby',
      question: 'Есть ли детские кресла?',
      answer: 'Да! Детские кресла предоставляются абсолютно бесплатно для детей от 0 до 12 лет. У нас есть кресла всех групп: для новорождённых (0–13 кг), для малышей (9–18 кг) и бустеры для детей постарше. При бронировании укажите возраст и вес ребёнка.',
      highlight: 'Детские кресла всех групп — бесплатно'
    },
    {
      icon: 'fas fa-paw',
      question: 'Можно ли перевозить животных?',
      answer: 'Да, мы перевозим домашних животных. Пожалуйста, предупредите нас заранее при бронировании, указав вид и размер питомца. Для крупных животных рекомендуем заказать минивэн. Животное должно находиться в переноске или на поводке.',
      highlight: 'Предупредите заранее — организуем всё необходимое'
    },
    {
      icon: 'fas fa-clock',
      question: 'За сколько нужно бронировать трансфер?',
      answer: 'Рекомендуем бронировать трансфер минимум за 24 часа — это гарантирует наличие нужного автомобиля. Однако в большинстве случаев мы можем организовать подачу машины уже через 2 часа после заявки. Для групп от 4 человек и в высокий сезон лучше бронировать заранее.',
      highlight: 'Срочная подача — от 2 часов после заявки'
    },
    {
      icon: 'fas fa-box-open',
      question: 'Что входит в стоимость трансфера?',
      answer: 'В стоимость включено всё необходимое: подача автомобиля к месту встречи, ожидание в аэропорту до 60 минут (при задержке рейса), помощь с погрузкой и выгрузкой багажа, детское кресло (по запросу), кондиционер, питьевая вода и Wi-Fi. Никаких скрытых доплат.',
      highlight: 'Никаких скрытых платежей — цена фиксирована'
    }
  ];

  toggle(index: number) {
    this.openIndex = this.openIndex === index ? -1 : index;
  }

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
