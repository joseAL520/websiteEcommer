import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerRoutingModule } from './ecommer-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { EcommerPageComponent } from './pages/ecommer-page/ecommer-page.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ProductPageComponent,
    EcommerPageComponent,
    FooterComponent,
    ContactPageComponent,
    AboutPageComponent
  ],
  imports: [
    CommonModule,
    EcommerRoutingModule
  ]
})
export class EcommerModule { }
