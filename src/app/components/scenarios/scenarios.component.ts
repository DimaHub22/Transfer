import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ScenarioFeature {
  icon: string;
  title: string;
  description: string;
}

interface Scenario {
  id: number;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  gradient: string;
  features: ScenarioFeature[];
  highlight?: boolean;
}

@Component({
  selector: 'app-scenarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scenarios.component.html',
  styleUrls: ['./scenarios.component.scss']
})
export class ScenariosComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  // Попап
  isPopupOpen = false;
  isSubmitted = false;
  selectedScenario: Scenario | null = null;

  // Форма заявки
  orderName = '';
  orderPhone = '';
  orderDate = '';
  orderComment = '';

  // Сценарии отдыха
  scenarios: Scenario[] = [
    {
      id: 1,
      name: 'Extreme & Drive',
      subtitle: 'Адреналин',
      tagline: 'Для тех, кто хочет почувствовать вкус жизни',
      description: 'Максимальные скорости, головокружительные высоты и незабываемые эмоции. Сценарий для тех, кто живёт на полную.',
      image: 'https://южные-регионы.рф/uploads/2025-04-24/FzysTnxO.png',
      icon: 'fas fa-bolt',
      gradient: 'linear-gradient(135deg, #dc2626, #f97316)',
      features: [
        {
          icon: 'fas fa-helicopter',
          title: 'Хели-ски',
          description: 'Трансфер на вертодром и высадка на диких склонах Красной Поляны'
        },
        {
          icon: 'fas fa-sailboat',
          title: 'Яхтинг',
          description: 'Гонки на спортивных яхтах или приватный ужин в открытом море на закате'
        },
        {
          icon: 'fas fa-car-side',
          title: 'Каньонинг и джиппинг',
          description: 'Экспедиции в труднодоступные ущелья на внедорожниках с пикником от шеф-повара'
        }
      ]
    },
    {
      id: 2,
      name: 'Spirit & Relax',
      subtitle: 'Гармония',
      tagline: 'Для тех, кто ищет тишины и перезагрузки',
      description: 'Уединённые места силы, практики на рассвете и полное отключение от суеты. Перезагрузка души и тела.',
      image: 'https://s.yimg.com/ny/api/res/1.2/f6SnLLdRd5QoapEHOy36fw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTEyMDA-/https://media.zenfs.com/en/insider_articles_922/3fe3fbb7caede47fb370b1254cfce415',
      icon: 'fas fa-spa',
      gradient: 'linear-gradient(135deg, #059669, #10b981)',
      features: [
        {
          icon: 'fas fa-mountain',
          title: 'Места силы',
          description: 'Индивидуальные поездки к дольменам и водопадам в часы без туристов'
        },
        {
          icon: 'fas fa-om',
          title: 'Йога на пике',
          description: 'Практика на вершине горы с персональным инструктором на рассвете'
        },
        {
          icon: 'fas fa-mug-hot',
          title: 'Чайные церемонии',
          description: 'Закрытые дегустации коллекционного чая в горах с видом на море'
        },
        {
          icon: 'fas fa-wine-glass',
          title: 'Винные туры',
          description: 'VIP-визит в лучшие шато региона с личным сомелье'
        }
      ],
      highlight: true
    },
    {
      id: 3,
      name: 'Вкус Высоты',
      subtitle: 'Гастрономия',
      tagline: 'Для искушённых гурманов, ценящих эстетику и эксклюзивность',
      description: 'Путешествие по карте вкусов южной гастрономической столицы России. Novikov Group, White Rabbit Family и лучшие шефы региона.',
      image: 'https://7d9e88a8-f178-4098-bea5-48d960920605.selcdn.net/7c91c739-ba50-44c9-92e6-a7776f0abbc2/-/resize/x600/-/quality/smart_retina/',
      icon: 'fas fa-utensils',
      gradient: 'linear-gradient(135deg, #d4af37, #f5d77e)',
      features: [
        {
          icon: 'fas fa-star',
          title: 'Тур по лучшим заведениям',
          description: 'Маршрут по топовым ресторанам побережья и Красной Поляны с авторской кухней'
        },
        {
          icon: 'fas fa-wine-bottle',
          title: 'Винный этикет',
          description: 'Посещение закрытых винных погребов и бутиковых виноделен с дегустацией'
        },
        {
          icon: 'fas fa-cloud-sun',
          title: 'Пикник над облаками',
          description: 'Персональный сервированный стол на вершине горы: шампанское, закуски и панорама Кавказа'
        }
      ]
    },
    {
      id: 4,
      name: 'Крепкий Орешек',
      subtitle: 'Блокбастер',
      tagline: 'Для тех, кто хочет почувствовать себя героем боевика',
      description: 'Максимальный драйв и адреналин. Сценарий для тех, кто хочет испытать себя на прочность и получить незабываемые впечатления.',
      image: 'https://s.momenty.org/static/upload/2023/12/05/616233_Splav_po_reke_Ay_Ayskie_pritesi_Chelyabinskaya_oblasty_obriv_splav_priroda_urala_otdih_priroda_vnutrenniy_turizm_kacheli_yuzhniy_ural_turizm_molodezhy_reka_ay_bolyshoy_prites_1200x0_3864.2576.0.0.jpg',
      icon: 'fas fa-fire-flame-curved',
      gradient: 'linear-gradient(135deg, #1a365d, #2563eb)',
      features: [
        {
          icon: 'fas fa-parachute-box',
          title: 'Прыжок с парашютом',
          description: 'Тандем-прыжок над побережьем с профессиональным инструктором'
        },
        {
          icon: 'fas fa-jet-fighter',
          title: 'Полёт на истребителе',
          description: 'Незабываемый полёт на спортивном самолёте с фигурами высшего пилотажа'
        },
        {
          icon: 'fas fa-person-hiking',
          title: 'Экстрим-маршруты',
          description: 'Восхождения, скалолазание и виа феррата с опытными гидами'
        },
        {
          icon: 'fas fa-water',
          title: 'Водный экстрим',
          description: 'Рафтинг, каякинг и погружение с аквалангом к затонувшим объектам'
        }
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

  // Открыть попап
  openPopup(scenario: Scenario) {
    this.selectedScenario = scenario;
    this.isPopupOpen = true;
    this.isSubmitted = false;
    document.body.style.overflow = 'hidden';
  }

  // Закрыть попап
  closePopup() {
    this.isPopupOpen = false;
    this.selectedScenario = null;
    document.body.style.overflow = '';
    this.resetForm();
  }

  // Отправить заявку
  submitOrder() {
    if (!this.orderName || !this.orderPhone || !this.selectedScenario) return;

    console.log('Заявка на сценарий:', {
      scenario: this.selectedScenario.name,
      name: this.orderName,
      phone: this.orderPhone,
      date: this.orderDate,
      comment: this.orderComment
    });

    this.isSubmitted = true;
  }

  // Сбросить форму
  private resetForm() {
    this.orderName = '';
    this.orderPhone = '';
    this.orderDate = '';
    this.orderComment = '';
    this.isSubmitted = false;
  }
}
