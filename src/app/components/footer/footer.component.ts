import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {


  @Input() isWideScreen: boolean = true;

  ngOnInit() {


  }
  navLinks = [
    { href: '#features', label: 'Преимущества' },
    { href: '#fleet',    label: 'Автопарк' },
    { href: '#prices',   label: 'Цены и маршруты' },
    { href: '#how',      label: 'Как это работает' },
    // { href: '#reviews',  label: 'Отзывы' },
    { href: '#faq',      label: 'Вопросы и ответы' },
    { href: '#booking',  label: 'Забронировать' },
  ];


  services = [
    'Трансфер Бизнес',
    'Минивэн до 7 мест',
    'Детские кресла',
    'Корпоративный трансфер',
    'Трансфер на горнолыжные курорты',
  ];
}
