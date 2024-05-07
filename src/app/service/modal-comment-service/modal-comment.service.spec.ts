import { TestBed } from '@angular/core/testing';

import { ModalCommentService } from './modal-comment.service';

describe('ModalCommentService', () => {
  let service: ModalCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
