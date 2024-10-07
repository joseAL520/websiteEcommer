import { Component, Input, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../dashboard/services/product-service.service';
import { map } from 'rxjs';
import { Products } from '../../../dashboard/interfaces/product.interfaces';
@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.css'
})
export class FavoritePageComponent  implements OnInit{


  public favorityList: Products[] = [];
  public arrayPrice: number[] = [];
  public modal:boolean = false
  constructor(
    private productService: ProductServiceService
  ){}

  getFavorityProducts(){
    this.productService.getProducts().pipe(
      map(value => value.filter( value => value.selected === true )),
      map(value =>  this.favorityList = value)
    ).subscribe(
      () =>  {
        this.recalculatePrices();
      }
    )
  }


  deleteSelect(product: Products) {
    if(!product) return
    product.selected = false;
    product.cantiSelect = 0;
    this.productService.updateProduct(product).subscribe(
      () => {
        this.getFavorityProducts()
      }
    )
  }

  onChangeCantidad(item: Products) {
    return this.productService.updateProduct(item).subscribe();
  }

  calculationForPrice(price: number, cant: number | undefined,index:number) {
    const total = price * (cant??1);
    this.arrayPrice[index] = total;
    return total;
  }
  
  calculationPriceTotal() {
    const suma = this.arrayPrice.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    return suma;
  }

  recalculatePrices() {
    this.arrayPrice = []; // Limpiar la lista de precios antes de recalcular
    this.favorityList.forEach((product, index) => {
      const total = this.calculationForPrice(product.price, product.cantiSelect, index);
    });
  }
  
  ngOnInit(): void {
    this.getFavorityProducts();
  }



}
