import { Injectable, Inject, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollLockService {
  private renderer: Renderer2;
  private isBrowser: boolean;
  private scrollPosition = 0;
  private lockCount = 0;
  private scrollbarWidth = 0;
  private isLocked = false;

  // Селекторы фиксированных элементов, которым нужно добавить padding
  private fixedElementsSelectors = [
    '.header',
    '.whatsapp-float',
    '.back-to-top',
    '[style*="position: fixed"]'
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    rendererFactory: RendererFactory2
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.renderer = rendererFactory.createRenderer(null, null);

    if (this.isBrowser) {
      this.scrollbarWidth = this.calculateScrollbarWidth();

      // Пересчитываем при resize
      window.addEventListener('resize', () => {
        this.scrollbarWidth = this.calculateScrollbarWidth();
      });
    }
  }

  /**
   * Рассчитать ширину скроллбара браузера
   */
  private calculateScrollbarWidth(): number {
    // Создаем временный элемент для измерения
    const outer = this.document.createElement('div');
    outer.style.cssText = `
      visibility: hidden;
      overflow: scroll;
      width: 100px;
      position: absolute;
      top: -9999px;
      left: -9999px;
    `;
    this.document.body.appendChild(outer);

    const inner = this.document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

    // Удаляем временный элемент
    if (outer.parentNode) {
      outer.parentNode.removeChild(outer);
    }

    return scrollbarWidth;
  }

  /**
   * Проверить, есть ли вертикальный скроллбар на странице
   */
  private hasVerticalScrollbar(): boolean {
    return this.document.body.scrollHeight > window.innerHeight;
  }

  /**
   * Получить все фиксированные элементы
   */
  private getFixedElements(): Element[] {
    const elements: Element[] = [];

    this.fixedElementsSelectors.forEach(selector => {
      try {
        const found = this.document.querySelectorAll(selector);
        found.forEach(el => elements.push(el));
      } catch (e) {
        // Игнорируем невалидные селекторы
      }
    });

    return elements;
  }

  /**
   * Заблокировать скролл страницы
   */
  lock(): void {
    if (!this.isBrowser) return;

    this.lockCount++;

    // Блокируем только при первом вызове
    if (this.lockCount === 1 && !this.isLocked) {
      this.isLocked = true;

      // Сохраняем текущую позицию скролла
      this.scrollPosition = window.scrollY || window.pageYOffset || this.document.documentElement.scrollTop;

      // Добавляем класс на html и body
      this.renderer.addClass(this.document.documentElement, 'scroll-locked');
      this.renderer.addClass(this.document.body, 'scroll-locked');

      // Фиксируем позицию через top
      this.renderer.setStyle(this.document.body, 'top', `-${this.scrollPosition}px`);

      // Компенсируем ширину скроллбара
      if (this.scrollbarWidth > 0 && this.hasVerticalScrollbar()) {
        this.renderer.setStyle(this.document.body, 'padding-right', `${this.scrollbarWidth}px`);

        // Добавляем padding к фиксированным элементам
        this.getFixedElements().forEach(el => {
          const currentPadding = parseInt(window.getComputedStyle(el).paddingRight) || 0;
          this.renderer.setStyle(el, 'padding-right', `${currentPadding + this.scrollbarWidth}px`);
          this.renderer.setAttribute(el, 'data-scroll-lock-padding', String(currentPadding));
        });
      }
    }
  }

  /**
   * Разблокировать скролл страницы
   */
  unlock(): void {
    if (!this.isBrowser) return;

    this.lockCount--;

    // Разблокируем только когда все попапы закрыты
    if (this.lockCount <= 0 && this.isLocked) {
      this.lockCount = 0;
      this.isLocked = false;

      // Убираем классы
      this.renderer.removeClass(this.document.documentElement, 'scroll-locked');
      this.renderer.removeClass(this.document.body, 'scroll-locked');

      // Убираем инлайн стили с body
      this.renderer.removeStyle(this.document.body, 'top');
      this.renderer.removeStyle(this.document.body, 'padding-right');

      // Восстанавливаем padding у фиксированных элементов
      this.getFixedElements().forEach(el => {
        const originalPadding = el.getAttribute('data-scroll-lock-padding');
        if (originalPadding !== null) {
          if (parseInt(originalPadding) > 0) {
            this.renderer.setStyle(el, 'padding-right', `${originalPadding}px`);
          } else {
            this.renderer.removeStyle(el, 'padding-right');
          }
          this.renderer.removeAttribute(el, 'data-scroll-lock-padding');
        } else {
          this.renderer.removeStyle(el, 'padding-right');
        }
      });

      // Восстанавливаем позицию скролла
      window.scrollTo({
        top: this.scrollPosition,
        left: 0,
        behavior: 'instant' as ScrollBehavior
      });
    }
  }

  /**
   * Принудительно разблокировать (сбросить счетчик)
   * Используется при уничтожении компонента
   */
  forceUnlock(): void {
    if (!this.isBrowser) return;

    if (this.isLocked) {
      this.lockCount = 1;
      this.unlock();
    }
  }

  /**
   * Проверить, заблокирован ли скролл
   */
  isScrollLocked(): boolean {
    return this.isLocked;
  }

  /**
   * Получить количество активных блокировок
   */
  getLockCount(): number {
    return this.lockCount;
  }

  /**
   * Получить сохраненную позицию скролла
   */
  getScrollPosition(): number {
    return this.scrollPosition;
  }

  /**
   * Получить ширину скроллбара
   */
  getScrollbarWidth(): number {
    return this.scrollbarWidth;
  }

  /**
   * Добавить селектор фиксированного элемента
   */
  addFixedElementSelector(selector: string): void {
    if (!this.fixedElementsSelectors.includes(selector)) {
      this.fixedElementsSelectors.push(selector);
    }
  }

  /**
   * Удалить селектор фиксированного элемента
   */
  removeFixedElementSelector(selector: string): void {
    const index = this.fixedElementsSelectors.indexOf(selector);
    if (index > -1) {
      this.fixedElementsSelectors.splice(index, 1);
    }
  }
}
