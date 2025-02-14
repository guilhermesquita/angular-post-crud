import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-main',
  standalone: true,
  imports: [CommonModule, ButtonMainComponent],
  templateUrl: './button-main.component.html',
  styleUrl: './button-main.component.css'
})
export class ButtonMainComponent {
  @Input() btn_content: string = '';
}
