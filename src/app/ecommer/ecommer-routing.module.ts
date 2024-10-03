import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { EcommerPageComponent } from './pages/ecommer-page/ecommer-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

const routes: Routes = [
  {
    path:'',
    component:LayoutPageComponent,
    children:[
      {path:'eco',component:EcommerPageComponent},
      {path:'contact',component:ContactPageComponent},
      {path:'about',component:AboutPageComponent},
      {path:'pageProduct/:id',component:ProductPageComponent},
      {path:'**', redirectTo:'eco'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerRoutingModule { }
