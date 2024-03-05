import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';

import { TeamComponentSection } from './team.component';

describe('TeamComponentSection', () => {
  let component: TeamComponentSection;
  let fixture: ComponentFixture<TeamComponentSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamComponentSection ],
      imports: [ HttpClientTestingModule ,AppModule] 
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamComponentSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
