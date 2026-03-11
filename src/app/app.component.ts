// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
//
// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'transfer-sochi';
// }

import {Component, OnInit, HostListener, Renderer2} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PreloaderComponent } from './components/preloader/preloader.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { HeaderComponent } from './components/header/header.component';
import { HeroComponent } from './components/hero/hero.component';
import { FeaturesComponent } from './components/features/features.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { DirectionsComponent } from './components/directions/directions.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { FaqComponent } from './components/faq/faq.component';
import { CtaComponent } from './components/cta/cta.component';
import { FooterComponent } from './components/footer/footer.component';
import {SunsetBlockComponent} from "./components/sunset-block/sunset-block.component";
import {FoodOrderComponent} from "./components/food-order/food-order.component";
import {ScenariosComponent} from "./components/scenarios/scenarios.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    PreloaderComponent,
    HeaderComponent,
    HeroComponent,
    FeaturesComponent,
    FleetComponent,
    DirectionsComponent,
    HowItWorksComponent,
    ReviewsComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent,
    SunsetBlockComponent,
    FoodOrderComponent,
    ScenariosComponent
  ],
  template: `
    <app-preloader [isLoading]="isLoading"></app-preloader>

    <div [class.page-loaded]="!isLoading">
      <app-header [isWideScreen]="isWideScreen"></app-header>

      <main>
        <app-sunset-block></app-sunset-block>

        <app-features id="features2"></app-features>
<!--        <app-hero id="home"></app-hero>-->
        <app-fleet id="fleet2"></app-fleet>
        <app-directions id="prices2"></app-directions>
<!--        <app-scenarios></app-scenarios>-->
<!--        <app-food-order></app-food-order>-->
        <app-how-it-works id="how"></app-how-it-works>
        <app-reviews id="reviews" *ngIf="isWideScreen"></app-reviews>
        <app-faq id="faq"></app-faq>
        <app-cta id="booking"></app-cta>
      </main>

      <app-footer id="contacts" [isWideScreen]="isWideScreen"></app-footer>

      <!-- WhatsApp Float -->
      <a href="https://max.ru/u/f9LHodD0cOLCkKK0EKHIUAIdDHs4Oku93mt5gGJ186EG9zUQazbje1EOsx8"
         target="_blank"
         class="whatsapp-float"
         aria-label="Написать в MAX">
           <span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 720">
            <path fill="#fff" d="M350.4,9.6C141.8,20.5,4.1,184.1,12.8,390.4c3.8,90.3,40.1,168,48.7,253.7,2.2,22.2-4.2,49.6,21.4,59.3,31.5,11.9,79.8-8.1,106.2-26.4,9-6.1,17.6-13.2,24.2-22,27.3,18.1,53.2,35.6,85.7,43.4,143.1,34.3,299.9-44.2,369.6-170.3C799.6,291.2,622.5-4.6,350.4,9.6h0ZM269.4,504c-11.3,8.8-22.2,20.8-34.7,27.7-18.1,9.7-23.7-.4-30.5-16.4-21.4-50.9-24-137.6-11.5-190.9,16.8-72.5,72.9-136.3,150-143.1,78-6.9,150.4,32.7,183.1,104.2,72.4,159.1-112.9,316.2-256.4,218.6h0Z"/>
          </svg>
          </span>
<!--        <i class="fab fa-whatsapp"></i>-->
      </a>

      <!-- Back to Top -->
      <button class="back-to-top"
              [class.visible]="showBackToTop"
              (click)="scrollToTop()"
              aria-label="Наверх">
        <i class="fas fa-chevron-up"></i>
      </button>
    </div>
  `,
  styles: [`
    .page-loaded {
      animation: fadeIn 0.5s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `]
})
export class AppComponent implements OnInit {
  isLoading = true;
  showBackToTop = false;
  isWideScreen = false;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {

    // Добавляем класс loaded после полной загрузки
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.renderer.addClass(document.body, 'loaded');
      }, 100);
    });


    // Preloader
    window.addEventListener('load', () => {
      window.scrollTo(0, 0);
    });

    this.checkScreenWidth();

    setTimeout(() => {
      this.isLoading = false;
    }, 2500);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showBackToTop = window.scrollY > 650;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }


  @HostListener('window:resize')
  onResize() {
    this.checkScreenWidth();
  }

  private checkScreenWidth() {
    // this.isWideScreen = window.innerWidth > 430;
    this.isWideScreen = false
  }
}
