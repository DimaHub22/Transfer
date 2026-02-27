import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface SetItem {
  name: string;
  portion: string;
}

interface FoodSet {
  id: number;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  persons: string;
  items: SetItem[];
  isPopular?: boolean;
  isNew?: boolean;
  discount?: number;
}

@Component({
  selector: 'app-food-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './food-order.component.html',
  styleUrls: ['./food-order.component.scss']
})
export class FoodOrderComponent implements AfterViewInit {
  @ViewChildren('revealEl') revealElements!: QueryList<ElementRef>;

  // Попап
  isPopupOpen = false;
  isSubmitted = false;
  selectedSet: FoodSet | null = null;

  // Форма заказа
  orderName = '';
  orderPhone = '';
  orderQuantity = 1;

  // Ссылка на полное меню ресторана
  menuLink = 'https://your-restaurant-menu.com';

  // Наборы-сеты
  foodSets: FoodSet[] = [
    {
      id: 1,
      name: 'Сет "Кавказский"',
      description: 'Идеальный набор для знакомства с кавказской кухней',
      price: 1990,
      oldPrice: 2450,
      image: 'https://img.vkusvill.ru/pim/images/site_LargeWebP/e06f0037-335d-44cf-8868-9e826b9261ac.webp?1694608512.4768',
      category: 'Кавказская кухня',
      persons: '2-3 персоны',
      discount: 19,
      isPopular: true,
      items: [
        { name: 'Хачапури по-аджарски', portion: '1 шт (350 г)' },
        { name: 'Шашлык из баранины', portion: '300 г' },
        { name: 'Хинкали', portion: '5 шт' },
        { name: 'Соус ткемали', portion: '100 г' },
        { name: 'Лаваш', portion: '2 шт' }
      ]
    },
    {
      id: 2,
      name: 'Сет "Морской"',
      description: 'Свежие морепродукты Черного моря',
      price: 2890,
      oldPrice: 3500,
      image: 'https://i.pinimg.com/originals/3a/d3/ed/3ad3edd574ca272b4f9e2f247de59ade.jpg?nii=t',
      category: 'Морепродукты',
      persons: '2 персоны',
      discount: 17,
      isNew: true,
      items: [
        { name: 'Форель на гриле', portion: '400 г' },
        { name: 'Креветки в чесночном соусе', portion: '200 г' },
        { name: 'Салат из морепродуктов', portion: '250 г' },
        { name: 'Рис с овощами', portion: '200 г' },
        { name: 'Соус тартар', portion: '80 г' }
      ]
    },
    {
      id: 3,
      name: 'Сет "Мясной"',
      description: 'Для настоящих ценителей мяса на углях',
      price: 3490,
      oldPrice: 4200,
      image: 'https://static.tildacdn.com/stor3137-3539-4134-b337-306562333233/75268224.jpg',
      category: 'Мясо',
      persons: '3-4 персоны',
      discount: 17,
      isPopular: true,
      items: [
        { name: 'Шашлык из баранины', portion: '400 г' },
        { name: 'Шашлык из свинины', portion: '400 г' },
        { name: 'Люля-кебаб', portion: '300 г' },
        { name: 'Овощи на гриле', portion: '300 г' },
        { name: 'Соусы (3 вида)', portion: '150 г' },
        { name: 'Лаваш', portion: '3 шт' }
      ]
    },
    {
      id: 4,
      name: 'Сет "Лёгкий"',
      description: 'Легкие закуски и салаты для перекуса',
      price: 1490,
      oldPrice: 1800,
      image: 'https://yandex-images.clstorage.net/zkNW49205/22cd47Il/m7CFaJFlM0Ds6ewv_yf_IE3fOCAzxonTmR2PIHi2mB5jnlKj9Vszo3ByjEnpaTASjV_6ZX8hoZzgrxjR21-yBD6EYPzEISaknOm9a0-DPoCM3mzh5_co9hne7Je_5PuM1YlQxELq9pPAV8hYCHgGtEk9OXS6FLYLJT6NgxrOZlDo0YYbsFSiRMy7T6qOZ50xH2zsclDEjwNvTm_XvMXqnMaZglfAe7TR4PQb70pJFYVOXpin28bViXf93IE4PTVDyeN3y_LWAKdcmd-bjCW9Qk89vmNRB0-CDf_vl11WOK71-PCE8whU8iMWuszY-mbFbRzaFkj0B-kV7Z7Duv-kQjlDhCkw1VIGn3s_WAzE7MKvTC3Cc-XsAx2uDmS8Z9nexolQRlJ6B4NhRfi_eWnVJi9P6maaxgf5hL1Pw-i_l0F78vU5UxdARn0qj6icB61C_80scfK2_rMvfh8ljGbJXTf5oiayqheCYUforPnqBlSv7Ir0eCfVSOd-jHOqPuQgaQO12oB2MydvGJ27bYde0y4MX2HQtk0Qn08_Rv6EqtxHOJD0ookGo5BnuF2qCzXlXCzJpcoUpWnVLi7RKE2VQEqzN8px1EJkjAj_mQ2ErtA8_kwj8Wcdkn-fnuf_xpkMdEhQJ-N6xdIhhXj-i9pX59xvWBWYR2ZodQ3N8xovBhH60_ZKojSiNP5JToqOV90DnOzO4VMHL-Purn1FfQZo3NZKkeWSSEZhkNY7jXlJ5CTNT6kn2OY06hbtbXL4nySACMB1myH0IGQeqe2Z3kXdYI9vLIOxp_xgrmxtBQ2Vqmyn-rD2E0p14VMVOq5buafUjn8Zh0kmZLjGfx9imuw0IBrjZdmDhNKUbblfeY4kfwK_DD2wc9cvcDy_fkWOpas9Z_lB9pKoxPODdwsM-6vmdT4M-BdaNdaZV6_O0HqNBnPo4fXIoBcSVS8r_-lMN6yRPo4u0DM2zXBd_B5FHzVLE',
      category: 'Салаты',
      persons: '2 персоны',
      discount: 17,
      items: [
        { name: 'Салат Цезарь с курицей', portion: '250 г' },
        { name: 'Греческий салат', portion: '220 г' },
        { name: 'Брускетта с томатами', portion: '3 шт' },
        { name: 'Хумус с лепешкой', portion: '150 г' }
      ]
    },
    {
      id: 5,
      name: 'Сет "Семейный"',
      description: 'Большой набор для всей семьи или компании',
      price: 4990,
      oldPrice: 6200,
      image: 'https://thumbs.dreamstime.com/b/на-сковороде-представлены-различные-овощи-гриле-разнообразные-а-также-320780879.jpg',
      category: 'Для компании',
      persons: '5-6 персон',
      discount: 20,
      isPopular: true,
      items: [
        { name: 'Хачапури по-мегрельски', portion: '2 шт' },
        { name: 'Шашлык ассорти', portion: '800 г' },
        { name: 'Хинкали', portion: '10 шт' },
        { name: 'Салат овощной', portion: '400 г' },
        { name: 'Овощи на гриле', portion: '400 г' },
        { name: 'Соусы (4 вида)', portion: '200 г' },
        { name: 'Лаваш', portion: '4 шт' },
        { name: 'Лимонад домашний', portion: '1 л' }
      ]
    },
    {
      id: 6,
      name: 'Сет "Десертный"',
      description: 'Сладкое завершение трапезы',
      price: 1290,
      oldPrice: 1550,
      image: 'https://cdn-s-static.catery.ru/storage/menu/item/4/3/5/4/435438/preview_preview_image-NKwELs9xCT6xiClqvFsbSu8pAAh7jqgV2g.jpg',
      category: 'Десерты',
      persons: '2-3 персоны',
      discount: 17,
      isNew: true,
      items: [
        { name: 'Тирамису', portion: '150 г' },
        { name: 'Чизкейк Нью-Йорк', portion: '150 г' },
        { name: 'Пахлава медовая', portion: '200 г' },
        { name: 'Чурчхела', portion: '2 шт' },
        { name: 'Чай в чайнике', portion: '500 мл' }
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

  // Открыть попап заказа
  openOrderPopup(set: FoodSet) {
    this.selectedSet = set;
    this.isPopupOpen = true;
    this.isSubmitted = false;
    this.orderQuantity = 1;
    document.body.style.overflow = 'hidden';
  }

  // Закрыть попап
  closePopup() {
    this.isPopupOpen = false;
    this.selectedSet = null;
    document.body.style.overflow = '';
    this.resetForm();
  }

  // Изменить количество
  changeQuantity(delta: number) {
    const newQty = this.orderQuantity + delta;
    if (newQty >= 1 && newQty <= 10) {
      this.orderQuantity = newQty;
    }
  }

  // Получить итоговую сумму
  getTotalPrice(): number {
    return this.selectedSet ? this.selectedSet.price * this.orderQuantity : 0;
  }

  // Получить сумму экономии
  getSavings(): number {
    if (!this.selectedSet || !this.selectedSet.oldPrice) return 0;
    return (this.selectedSet.oldPrice - this.selectedSet.price) * this.orderQuantity;
  }

  // Отправить заказ
  submitOrder() {
    if (!this.orderName || !this.orderPhone || !this.selectedSet) return;

    console.log('Заказ сета:', {
      set: this.selectedSet.name,
      quantity: this.orderQuantity,
      total: this.getTotalPrice(),
      savings: this.getSavings(),
      name: this.orderName,
      phone: this.orderPhone
    });

    this.isSubmitted = true;
  }

  // Сбросить форму
  private resetForm() {
    this.orderName = '';
    this.orderPhone = '';
    this.orderQuantity = 1;
    this.isSubmitted = false;
  }

  // Форматирование цены
  formatPrice(price: number): string {
    return price.toLocaleString('ru-RU') + ' ₽';
  }
}
