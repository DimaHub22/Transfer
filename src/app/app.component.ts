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

import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PreloaderComponent } from './components/preloader/preloader.component';
import { PreloaderComponent } from './src/app/components/preloader/preloader.component';
import { HeaderComponent } from './src/app/components/header/header.component';
import { HeroComponent } from './src/app/components/hero/hero.component';
import { FeaturesComponent } from './src/app/components/features/features.component';
import { FleetComponent } from './src/app/components/fleet/fleet.component';
import { DirectionsComponent } from './src/app/components/directions/directions.component';
import { HowItWorksComponent } from './src/app/components/how-it-works/how-it-works.component';
import { ReviewsComponent } from './src/app/components/reviews/reviews.component';
import { FaqComponent } from './src/app/components/faq/faq.component';
import { CtaComponent } from './src/app/components/cta/cta.component';
import { FooterComponent } from './src/app/components/footer/footer.component';

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
    FooterComponent
  ],
  template: `
    <app-preloader [isLoading]="isLoading"></app-preloader>

    <div [class.page-loaded]="!isLoading">
      <app-header [isWideScreen]="isWideScreen"></app-header>

      <main>
        <app-hero id="home"></app-hero>
        <app-features id="features"></app-features>
        <app-fleet id="fleet"></app-fleet>
        <app-directions id="prices"></app-directions>
        <app-how-it-works id="how"></app-how-it-works>
        <app-reviews id="reviews" *ngIf="isWideScreen"></app-reviews>
        <app-faq id="faq"></app-faq>
        <app-cta id="booking"></app-cta>
      </main>

      <app-footer id="contacts" [isWideScreen]="isWideScreen"></app-footer>

      <!-- WhatsApp Float -->
      <a href="https://wa.me/78620000000"
         target="_blank"
         class="whatsapp-float"
         aria-label="Написать в WhatsApp">
        <i class="fab fa-whatsapp"></i>
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
  isWideScreen = true;

  ngOnInit() {
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
    this.isWideScreen = window.innerWidth > 430;
  }
}
