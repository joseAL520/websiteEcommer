import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <button (click)="goIntPage()">Ir al Inicio</button>
    <p>layoutPage del dash works!</p>
  `,
  styleUrl: './layoutPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutPageComponent {

constructor(private router:Router){}

goIntPage() {
  this.router.navigate(['/ecommer']);
}

}
