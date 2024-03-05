import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { MySubsComponent } from './my-subs.component';

describe('MySubsComponent', () => {
  let component: MySubsComponent;
  let fixture: ComponentFixture<MySubsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySubsComponent ],
      imports: [ HttpClientTestingModule ,AppModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySubsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
