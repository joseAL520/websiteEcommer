import { Component } from '@angular/core';

interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  rank: number;
  selected: boolean;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  products: Product[] = [
    {
      id: 1,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      title: 'PRODUCT',
      price: 200,
      rank: 1.2,
      selected: false
    },
    {
      id: 2,
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      title: 'PRODUCT 2',
      price: 300,
      rank: 4.5,
      selected: false
    },
 
  ];
  
 public productSelect: any[] = [];
  
  onToggleSelect(product:Product) {
    product.selected = !product.selected;
    this.updateToggleSelect(product)
  }

  updateToggleSelect(product:Product){
      if(product.selected){
          this.productSelect.push(product);
      }else {
        this.productSelect = this.productSelect.filter(p => p.id !== product.id);
      }
      console.log(this.productSelect);
  }

  

  getStarRating(rank: number): any {
    const fullStars = Math.floor(rank);
    const halfStars = rank % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return [
      ...Array(fullStars).fill('full'),
      ...Array(halfStars).fill('half'),
    ];
  }

  buyProductSelect(product:Product){
      console.log('comprar ',product)
  }
    
}
