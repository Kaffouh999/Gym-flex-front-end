import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { BmiCalcComponent } from './bmi-calc.component';

describe('BmiCalcComponent', () => {
  let component: BmiCalcComponent;
  let fixture: ComponentFixture<BmiCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmiCalcComponent ],
      imports: [ HttpClientTestingModule ,AppModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(BmiCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
