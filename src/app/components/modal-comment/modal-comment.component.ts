import { Component, Input } from '@angular/core';
import { ButtonConfirmComponent } from '../button-confirm/button-confirm.component';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { CommonModule } from '@angular/common';
import { ModalCommentService } from '../../service/modal-comment-service/modal-comment.service';
import { CommentService } from '../../service/comment-service/comments.service';
import { Comment } from '../../models/Comment';
import { PostService } from '../../service/post-service/post.service';

@Component({
  selector: 'app-modal-comment',
  standalone: true,
  imports: [CommonModule, ModalCommentComponent, ButtonMainComponent, ButtonConfirmComponent],
  templateUrl: './modal-comment.component.html',
  styleUrl: './modal-comment.component.css'
})
export class ModalCommentComponent {
  @Input() titleModal: string = ''
  constructor(
    public modalCommentService: ModalCommentService,
    public postService: PostService,
    private commentService: CommentService) { }

  openCommentModal() {
    this.modalCommentService.openModal();
  }

  closeCommentModal() {
    this.modalCommentService.closeModal();
  }


  foundMethod(content: string) {
    if (this.commentService.method === 'POST') {
      let localComments = new Array<Comment>();
      const storedComments = localStorage.getItem('comments');

      if (storedComments !== null) {
        // alert(this.postService.id_post)
        localComments = JSON.parse(storedComments);
        // console.log(localComments);
        localComments.push({
          content: content,
          idComment: localComments.length + 1,
          idPost: Number(this.postService.id_post),
          idUser: 101
        });
        localStorage.setItem('comments', JSON.stringify(localComments));
        window.location.reload();
      }
    }
    if (this.commentService.method === 'PUT') {
      let localComments = new Array<Comment>();
      const storedComments = localStorage.getItem('comments');

      if (storedComments !== null) {
        const id = this.commentService.id_comment
        localComments = JSON.parse(storedComments);
        const itemIndex = localComments.findIndex(function (item) {
          return item.idComment === Number(id)
        });

        if (itemIndex !== -1) {
          localComments[itemIndex] = {
            idComment: localComments[itemIndex].idComment,
            idPost: localComments[itemIndex].idPost,
            idUser: localComments[itemIndex].idUser,
            content: content || localComments[itemIndex].content
          }
          localStorage.setItem('comments', JSON.stringify(localComments));
          this.postService.id_post = '';
          window.location.reload();
        }
      }
    }
  }
}
