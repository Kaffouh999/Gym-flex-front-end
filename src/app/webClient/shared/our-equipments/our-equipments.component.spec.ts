import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurEquipmentsComponent } from './our-equipments.component';

describe('OurEquipmentsComponent', () => {
  let component: OurEquipmentsComponent;
  let fixture: ComponentFixture<OurEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurEquipmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
