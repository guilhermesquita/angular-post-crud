import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})

export class PostListComponent {
  @Input() title: string = "";
  @Input() description: string = "";
  @Input() btn_content: string = "";
}
