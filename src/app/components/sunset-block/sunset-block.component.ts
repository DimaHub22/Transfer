import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-sunset-block',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sunset-block.component.html',
  styleUrl: './sunset-block.component.scss'
})
export class SunsetBlockComponent {
  isPopupOpen = false;
  activeTab: 'callback' | 'autojet' = 'callback';
  isSubmitted = false;

  // Форма обратного звонка
  callbackName = '';
  callbackPhone = '';

  // Форма заказа АвтоДжет
  autojetName = '';
  autojetPhone = '';
  autojetHours = 1;

  // Массив часов 1-24
  hoursOptions = Array.from({ length: 24 }, (_, i) => i + 1);

  openPopup() {
    this.isPopupOpen = true;
    this.activeTab = 'callback';
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
    this.isSubmitted = false;
  }

  submitCallback() {
    if (!this.callbackName || !this.callbackPhone) return;
    console.log('Обратный звонок:', {
      name: this.callbackName,
      phone: this.callbackPhone
    });
    this.isSubmitted = true;
  }

  submitAutojet() {
    if (!this.autojetName || !this.autojetPhone) return;
    console.log('Заказ АвтоДжет:', {
      name: this.autojetName,
      phone: this.autojetPhone,
      hours: this.autojetHours
    });
    this.isSubmitted = true;
  }

  getHoursLabel(h: number): string {
    if (h === 1) return '1 час';
    if (h >= 2 && h <= 4) return `${h} часа`;
    return `${h} часов`;
  }

  private resetForms() {
    this.callbackName = '';
    this.callbackPhone = '';
    this.autojetName = '';
    this.autojetPhone = '';
    this.autojetHours = 1;
    this.isSubmitted = false;
  }
}
