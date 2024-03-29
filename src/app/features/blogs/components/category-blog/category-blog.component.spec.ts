import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryBlogComponent } from './category-blog.component';

describe('CategoryBlogComponent', () => {
  let component: CategoryBlogComponent;
  let fixture: ComponentFixture<CategoryBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
