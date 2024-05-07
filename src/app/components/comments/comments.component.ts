import { Component, Input } from '@angular/core';
import { CommentService } from '../../service/comment-service/comments.service';
import { ModalCommentService } from '../../service/modal-comment-service/modal-comment.service';
import { PostService } from '../../service/post-service/post.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent {

  constructor(private commentService: CommentService, 
    private modalCommentService: ModalCommentService,
    private postService: PostService){}

  @Input() id_user: string = "";
  @Input() content: string = "";
  @Input() id_post: string = "";
  @Input() id_comment: string = "";

  openCommentModal(){
    this.postService.id_post = this.id_post;
    this.commentService.id_comment = this.id_comment;
    this.commentService.method = 'PUT';
    this.modalCommentService.openModal()
  }
}
