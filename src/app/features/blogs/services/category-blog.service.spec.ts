import { TestBed } from '@angular/core/testing';

import { CategoryBlogService } from './category-blog.service';

describe('CategoryBlogService', () => {
  let service: CategoryBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
