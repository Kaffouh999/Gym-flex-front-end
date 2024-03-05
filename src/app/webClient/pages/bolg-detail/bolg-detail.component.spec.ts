import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BolgDetailComponent } from './bolg-detail.component';

describe('BolgDetailComponent', () => {
  let component: BolgDetailComponent;
  let fixture: ComponentFixture<BolgDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BolgDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BolgDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
