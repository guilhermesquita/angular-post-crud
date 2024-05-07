import { Component, Input } from '@angular/core';
import { ButtonConfirmComponent } from '../button-confirm/button-confirm.component';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { CommonModule } from '@angular/common';
import { ModalCommentService } from '../../service/modal-comment-service/modal-comment.service';
import { CommentService } from '../../service/comment-service/comments.service';
import { Comment } from '../../models/Comment';
import { PostService } from '../../service/post-service/post.service';
import { LocalStorageService } from '../../service/increment-id/id-service.service';

@Component({
  selector: 'app-modal-comment',
  standalone: true,
  imports: [CommonModule, ModalCommentComponent, ButtonMainComponent, ButtonConfirmComponent],
  templateUrl: './modal-comment.component.html',
  styleUrl: './modal-comment.component.css'
})
export class ModalCommentComponent {
  @Input() titleModal: string = ''
  nextId: number | undefined;
  constructor(
    public modalCommentService: ModalCommentService,
    public postService: PostService,
    private commentService: CommentService,
    private localStorageService: LocalStorageService
  ) { }

  openCommentModal() {
    this.modalCommentService.openModal();
  }

  closeCommentModal() {
    this.modalCommentService.closeModal();
  }

  foundMethod(content: string) {

    const lastId = this.localStorageService.getUniqueId();
    this.nextId = lastId + 1;
    this.localStorageService.saveUniqueId(this.nextId);

    if (this.commentService.method === 'POST') {
      let localComments = new Array<Comment>();
      const storedComments = localStorage.getItem('comments');

      const id_comment = localStorage.getItem('id');
      let idRecuperado
      if (id_comment) {
        idRecuperado = parseInt(id_comment, 10)
      }
      if (idRecuperado) {
        idRecuperado = idRecuperado + 1
        localStorage.setItem('id', idRecuperado.toString())
      }

      if (storedComments !== null) {
        localComments = JSON.parse(storedComments);
        localComments.push({
          content: content,
          idComment: this.nextId,
          idPost: Number(this.postService.id_post),
          idUser: 101
        });

        localStorage.setItem('comments', JSON.stringify(localComments));
        window.location.reload();
      }else{
        this.commentService.createComment(content)
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
        }else{
          this.commentService.updateComment(this.nextId, content)
        }
      }
    }
  }
}
