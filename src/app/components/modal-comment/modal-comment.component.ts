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
  @Input() titleModal: string = '';
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
    this.nextId = this.localStorageService.getUniqueId() + 1;
    this.localStorageService.saveUniqueId(this.nextId);

    if (this.commentService.method === 'POST') {
      const localComments = this.getStoredComments();
      localComments.push({
        content: content,
        idComment: this.nextId,
        idPost: Number(this.postService.id_post),
        idUser: 101
      });
      this.updateStoredComments(localComments);
    } else if (this.commentService.method === 'PUT') {
      const localComments = this.getStoredComments();
      const itemIndex = localComments.findIndex(item => item.idComment === Number(this.commentService.id_comment));
      if (itemIndex !== -1) {
        localComments[itemIndex].content = content || localComments[itemIndex].content;
        this.updateStoredComments(localComments);
      } else {
        this.commentService.updateComment(this.nextId, content);
      }
    }
  }

  private getStoredComments(): Comment[] {
    const storedComments = localStorage.getItem('comments');
    return storedComments ? JSON.parse(storedComments) : [];
  }

  private updateStoredComments(comments: Comment[]) {
    localStorage.setItem('comments', JSON.stringify(comments));
    window.location.reload();
  }
}