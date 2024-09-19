import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { AddNewProductComponent } from './pages/add-new-product/add-new-product.component';
import { ListProductComponent } from './pages/list-product/list-product.component';
import { ProductVisualComponent } from './pages/product-visual/product-visual.component';

const routes: Routes = [

  {
    path:'',
    component:LayoutPageComponent,
    children:[
      {path:'addProduct',component:AddNewProductComponent},
      {path:'edit/:id',component:AddNewProductComponent},
      {path:'listProduct',component:ListProductComponent},
      {path:':id',component:ProductVisualComponent},
      {path:'**',redirectTo:'addProduct'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
