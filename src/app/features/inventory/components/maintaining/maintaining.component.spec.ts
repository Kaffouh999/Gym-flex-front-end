import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { MaintainingComponent } from './maintaining.component';

describe('MaintainingComponent', () => {
  let component: MaintainingComponent;
  let fixture: ComponentFixture<MaintainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainingComponent ],
      imports: [ HttpClientTestingModule ,AppModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
