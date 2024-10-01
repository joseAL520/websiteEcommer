import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../../../dashboard/services/product-service.service';
import { Products } from '../../../dashboard/interfaces/product.interfaces';
import { tap } from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit{

  public productsRulet: Products[] = [];

  constructor(
    private productService: ProductServiceService
  ){}


  productPages(arg0: number|undefined) {
    console.log(arg0)
  }

  
  ngOnInit(): void {
    this.productService.getProducts().pipe(
      tap(Valu => {
        Valu.sort( () => Math.random() - 0.5)
      })
    ).subscribe( randomProducts  => 
       this.productsRulet = randomProducts
    )
  }



}
