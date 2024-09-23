import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Products } from '../../interfaces/product.interfaces';

@Component({
  selector: 'component-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Output() 
  public closeModal: EventEmitter<void> = new EventEmitter();
  @Input()
  public infoCard: Products[]=[] 
  


  close() {
    this.closeModal.emit();
  }


}
