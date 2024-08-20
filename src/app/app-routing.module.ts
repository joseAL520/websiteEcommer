import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';

const routes: Routes = [

  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path:'ecommer',
    loadChildren:() => import('./ecommer/ecommer.module').then(m => m.EcommerModule)
  },
  {
    path:'dash',
    loadChildren:() => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    // por si no se encuentra la direccion
    path:'404',
    component: Error404PageComponent
  },
  {
    path:'',
    redirectTo:'ecommer',
    pathMatch:'full' // ayuda para que no se redirecciones
  },
  {
    path:'**',
    redirectTo:'404',
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
