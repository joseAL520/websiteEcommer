import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductServiceService } from '../../../dashboard/services/product-service.service';
import { switchMap } from 'rxjs';
import { Products } from '../../../dashboard/interfaces/product.interfaces';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent implements OnInit {

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

  ngOnInit(): void {
  
    this.activateRouter.params
      .pipe(
        switchMap(({ id }) => this.serviceProduct.getProductByid(id))
      ).subscribe( value => this.productInfo = value);

  }



}
