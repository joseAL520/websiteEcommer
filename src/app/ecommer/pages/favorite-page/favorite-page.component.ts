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


  public favorityList: Products[] = []
  constructor(
    private productService: ProductServiceService
  ){}

  getFavorityProducts(){
    this.productService.getProducts().pipe(
      map(value => value.filter( value => value.selected === true )),
      map(value =>  this.favorityList = value)
    ).subscribe(
      () =>  this.calculationPriceTotal()
    )
  }


  deleteSelect(product: Products) {
    if(!product) return

    product.selected = false;
    this.productService.updateProduct(product).subscribe(
      () => this.getFavorityProducts()
    )
  }

  calculationPriceTotal(){
   const total = this.favorityList.reduce((sum,produc) => sum + produc.price,0)
   return total
  }

  ngOnInit(): void {
      this.getFavorityProducts();
  }

}
