import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { LoginFirstComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginFirstComponent;
  let fixture: ComponentFixture<LoginFirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ,AppModule] ,
      declarations: [ LoginFirstComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
