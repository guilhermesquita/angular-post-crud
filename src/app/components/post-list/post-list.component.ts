import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [ButtonMainComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})

export class PostListComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() btn_content: string = "";
}
