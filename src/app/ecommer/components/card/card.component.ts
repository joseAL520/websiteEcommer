import { Component,OnInit } from '@angular/core';
import { Products } from '../../../dashboard/interfaces/product.interfaces';
import { ProductServiceService } from '../../../dashboard/services/product-service.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{
 
  public products:Products[] = [];
  public productSelect: any[] = [];
  public currentProducts: Products[] = [];
  public currentPage: number = 1;
  public productsPerPage: number = 8;
  public totalPages: number = 0;
  
  constructor(
    private productService: ProductServiceService
  ){}
  
  onToggleSelect(product:Products) {
    if (!product.selected) {
      product.selected = true; 
      product.cantiSelect = +1;
      if (!this.productSelect.some(p => p.id === product.id)) {

        this.productSelect.push(product); 
      }
    } else {
      product.selected = false;
      product.cantiSelect = 0;
      this.productSelect = this.productSelect.filter(p => p.id !== product.id);
    }
    this.updateSelector(product);
  }

  updateSelector(product:Products){
    this.productService.updateProduct(product).subscribe()
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

  buyProductSelect(product:Products){
      console.log('comprar ',product)
  }

  updateDisplayedProducts() {
    const start = (this.currentPage - 1) * this.productsPerPage;
    const end = start + this.productsPerPage;
    this.currentProducts = this.products.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedProducts();
    }
  }
  
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedProducts();
    }
  }
  

  ngOnInit(): void {
    this.productService.getProducts().subscribe((value) => {
      this.products = value;
      this.totalPages = Math.ceil(this.products.length / this.productsPerPage);
      this.updateDisplayedProducts();
    });
  }
    
}
