import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddNewProductComponent } from './pages/add-new-product/add-new-product.component';
import { ProductVisualComponent } from './pages/product-visual/product-visual.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card-modal/card.component';


@NgModule({
  declarations: [
    AddNewProductComponent,
    ProductVisualComponent,
    ListProductComponent,
    CardComponent,

  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,    
  ]
})
export class DashboardModule { }
