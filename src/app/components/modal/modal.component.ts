import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ButtonConfirmComponent } from '../button-confirm/button-confirm.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, ButtonMainComponent, ButtonConfirmComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  mostrar: boolean = true;

  toggle() {
    this.mostrar = !this.mostrar;
  }
}
