import { Component, Input } from '@angular/core';
import { CommentService } from '../../service/comment-service/comments.service';
import { ModalCommentService } from '../../service/modal-comment-service/modal-comment.service';
import { PostService } from '../../service/post-service/post.service';
import { Comment } from '../../models/Comment';

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
    this.modalCommentService.openModal();
  }

  deleteComment(){
    if (confirm('Tem certeza que deseja excluir este comentário?')) {
      if (this.deleteLocalComment()) {
        window.location.reload();
      } else {
        this.commentService.deleteComment(Number(this.id_comment))
          .subscribe(() => {
          }, error => {
            console.error('Erro ao excluir comentário:', error);
          });
      }
    }
  }

  private deleteLocalComment(): boolean {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
      const id = Number(this.id_comment);
      let localComments: Comment[] = JSON.parse(storedComments);
      localComments = localComments.filter(item => item.idComment !== id);
      localStorage.setItem('comments', JSON.stringify(localComments));
      return true;
    }
    return false;
  }
}