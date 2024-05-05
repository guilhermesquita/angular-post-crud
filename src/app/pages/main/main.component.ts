import { Component, Input } from '@angular/core';
import { PostListComponent } from '../../components/post-list/post-list.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [PostListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  @Input() contentBtn: string = "";
}
