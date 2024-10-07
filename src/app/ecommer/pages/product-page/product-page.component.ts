import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../../dashboard/services/product-service.service';
import { switchMap } from 'rxjs';
import { Products } from '../../../dashboard/interfaces/product.interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit, OnDestroy{


  public productInfo!: Products

   constructor(
    private serviceProduct: ProductServiceService,
    private activateRouter: ActivatedRoute,
  ){}
 

  
  getStarRating(rank: number): any {

    const fullStars = Math.floor(rank);
    const halfStars = rank % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStars).fill('half'),
    ];
  }

  onChangeCantidad(item: Products) {
    if ((item.cantiSelect??0) > (item.count??0)) {
      item.cantiSelect = item.count;
     return alert(`La cantidad seleccionada no puede ser mayor que ${item.count}.`);
    }

    if ((item.cantiSelect??0) < 0) {
      item.cantiSelect = 0;
     return alert(`La cantidad debe ser mayor a 0`);
    }

    return this.serviceProduct.updateProduct(item).subscribe();
  }

  calculationPrice(price:number, count:number|undefined) {
    const total = price * (count??0)
    return total
  }

  ngOnInit(): void {
  
    this.activateRouter.params
      .pipe(
        switchMap(({ id }) => this.serviceProduct.getProductByid(id))
      ).subscribe( value => {
        this.productInfo = value
      });

  }

  ngOnDestroy(): void {
    this.productInfo.cantiSelect = 0;
    console.log(this.productInfo)
    this.serviceProduct.updateProduct(this.productInfo).subscribe()
  }


}
