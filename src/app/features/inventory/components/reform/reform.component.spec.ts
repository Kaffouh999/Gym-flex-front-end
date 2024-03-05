import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { ReformComponent } from './reform.component';

describe('ReformComponent', () => {
  let component: ReformComponent;
  let fixture: ComponentFixture<ReformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReformComponent ],
      imports: [ HttpClientTestingModule ,AppModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
