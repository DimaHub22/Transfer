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
    { href: '#features2', label: 'Преимущества' },
    { href: '#fleet2',    label: 'Автопарк' },
    { href: '#prices2',   label: 'Цены и маршруты' },
    { href: '#how',      label: 'Как это работает' },
    // { href: '#reviews',  label: 'Отзывы' },
    { href: '#faq',      label: 'Вопросы и ответы' },
    { href: '#booking',  label: 'Забронировать' },
  ];
  dataSite():number{
    return new Date().getFullYear();
  }


  services = [
    'Трансфер Бизнес',
    'Минивэн до 5 мест',
    'Детские кресла',
    'Корпоративный трансфер',
    'Трансфер на горнолыжные курорты',
  ];
}
