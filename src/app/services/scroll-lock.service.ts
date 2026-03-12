// src/app/services/scroll-lock.service.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollLockService {
  private isBrowser: boolean;
  private scrollPosition = 0;
  private isLocked = false;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /**
   * Заблокировать скролл
   */
  lock(): void {
    if (!this.isBrowser || this.isLocked) return;

    this.isLocked = true;

    // Сохраняем позицию скролла
    this.scrollPosition = window.scrollY || window.pageYOffset;

    // Добавляем классы
    this.document.documentElement.classList.add('scroll-locked');
    this.document.body.classList.add('scroll-locked');

    // Фиксируем позицию
    this.document.body.style.top = `-${this.scrollPosition}px`;
  }

  // /**
  //  * Разблокировать скролл
  //  */
  // unlock(): void {
  //   if (!this.isBrowser || !this.isLocked) return;
  //
  //   this.isLocked = false;
  //
  //   // Убираем классы
  //   this.document.documentElement.classList.remove('scroll-locked');
  //   this.document.body.classList.remove('scroll-locked');
  //
  //   // Убираем стили
  //   this.document.body.style.top = '';
  //
  //   // Восстанавливаем позицию
  //   window.scrollTo(0, this.scrollPosition);
  // }


  /**
   * Разблокировать скролл
   */
  unlock(): void {
    if (!this.isBrowser || !this.isLocked) return;

    this.isLocked = false;

    // Сохраняем позицию до удаления классов
    const scrollY = this.scrollPosition;

    // Временно отключаем плавный скролл
    const html = this.document.documentElement;
    const originalScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';

    // Убираем классы
    this.document.documentElement.classList.remove('scroll-locked');
    this.document.body.classList.remove('scroll-locked');

    // Убираем стили
    this.document.body.style.top = '';

    // Мгновенно восстанавливаем позицию
    window.scrollTo(0, scrollY);

    // Возвращаем плавный скролл через небольшую задержку
    requestAnimationFrame(() => {
      html.style.scrollBehavior = originalScrollBehavior;
    });
  }

  // /**
  //  * Принудительно разблокировать
  //  */
  // forceUnlock(): void {
  //   if (!this.isBrowser) return;
  //
  //   this.isLocked = false;
  //   this.document.documentElement.classList.remove('scroll-locked');
  //   this.document.body.classList.remove('scroll-locked');
  //   this.document.body.style.top = '';
  // }

  /**
   * Принудительно разблокировать
   */
  forceUnlock(): void {
    if (!this.isBrowser) return;

    const scrollY = this.scrollPosition;

    // Временно отключаем плавный скролл
    const html = this.document.documentElement;
    html.style.scrollBehavior = 'auto';

    this.isLocked = false;
    this.document.documentElement.classList.remove('scroll-locked');
    this.document.body.classList.remove('scroll-locked');
    this.document.body.style.top = '';

    window.scrollTo(0, scrollY);

    requestAnimationFrame(() => {
      html.style.scrollBehavior = '';
    });
  }

  /**
   * Проверить статус
   */
  isScrollLocked(): boolean {
    return this.isLocked;
  }
}
