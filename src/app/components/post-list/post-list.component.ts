import { Component, Input } from '@angular/core';
import { ButtonMainComponent } from '../button-main/button-main.component';
import { ModalService } from '../../service/modal-service/modal.service';
import { PostService } from '../../service/post-service/post.service';
import { Post } from '../../models/Post';
import { CommentsComponent } from '../comments/comments.component';
import { CommentService } from '../../service/comment-service/comments.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/Comment';
import { ModalCommentService } from '../../service/modal-comment-service/modal-comment.service';
import { LocalStorageService } from '../../service/increment-id/id-service.service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [ButtonMainComponent, CommentsComponent, CommonModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})

export class PostListComponent {
  constructor(public modalService: ModalService,
    public postService: PostService,
    private commentService: CommentService,
    private modalCommentService: ModalCommentService
  ) { }

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() btn_content: string = "";
  @Input() id_post: string = "";
  nextId: number | undefined;
  comments: Comment[] = [];

  ngOnInit(): void {
    let linkedComment: boolean = false
    let localComments: string | null

    localStorage.getItem('comments') ? linkedComment = true : linkedComment = false
    if (linkedComment) {
      localComments = localStorage.getItem('comments');
      if (localComments) {
        this.comments = JSON.parse(localComments);
        let commentById = this.comments
        this.postService.id_post = this.id_post;
        this.comments = commentById.filter(comment => comment.idPost === Number(this.postService.id_post))
      }
    }
    else {
      this.commentApi();
    }
  }
  OpenModalToEdit() {
    this.postService.id_post = this.id_post;
    this.postService.method = 'PUT';
    this.modalService.openModal();
    this.modalService.modalTitle = 'editar post';
  }

  openCommentModalToCreate() {
    this.commentService.method = 'POST';
    this.modalCommentService.openModal()
    this.postService.id_post = this.id_post;
    this.modalCommentService.modalTitle = 'novo comentário'
  }

  deletePost() {
    let localPosts = new Array<Post>();
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      this.postService.id_post = this.id_post;
      const id = this.postService.id_post
      localPosts = JSON.parse(storedPosts);
      const filtered = localPosts.filter(item => item.id !== Number(id));
      localStorage.setItem('posts', JSON.stringify(filtered));
      window.location.reload();
    } else {
      this.postService.deletePost(Number(this.id_post));
    }
  }

  commentApi() {
    this.commentService.getCommentByID(Number(this.id_post)).subscribe(
      (comment: Comment | null) => {
        if (comment) {
          console.log('Comentário encontrado:', comment);
        } else {
          console.log('Comentário não encontrado');
        }
      },
      error => {
        console.error('Erro ao buscar o comentário:', error);
      }
    );
  }
}
