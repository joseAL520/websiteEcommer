import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EcommerRoutingModule } from './ecommer-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { EcommerPageComponent } from './pages/ecommer-page/ecommer-page.component';
import { MenuComponent } from './shared/menu/menu.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ProductPageComponent,
    EcommerPageComponent,
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    EcommerRoutingModule
  ]
})
export class EcommerModule { }
