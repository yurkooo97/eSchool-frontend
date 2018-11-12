import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEduYearComponent } from './new-edu-year.component';

describe('NewEduYearComponent', () => {
  let component: NewEduYearComponent;
  let fixture: ComponentFixture<NewEduYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewEduYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEduYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
