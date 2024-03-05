import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { MyAttendnsComponent } from './my-attendns.component';

describe('MyAttendnsComponent', () => {
  let component: MyAttendnsComponent;
  let fixture: ComponentFixture<MyAttendnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyAttendnsComponent ],
      imports: [ HttpClientTestingModule ,AppModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyAttendnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
